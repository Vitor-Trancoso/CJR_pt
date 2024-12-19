import { useEffect, useState } from "react";
import './NewPublicationModal.css';
import { useRouter } from "next/navigation";

export default function NovaPublicacaoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [professor, getprof] = useState<any>([]);
  const Router = useRouter();
  const [user, getUser] = useState<any>({});
  const [aval, setaval] = useState<Avaliacao>({
    usuarioID: 0,
    diciplinaID: 0,
    professorID: 0,
    conteudo: "",
  });

  const [conteudo, setConteudo] = useState(""); 

  interface Avaliacao {
    usuarioID: number;
    diciplinaID: number;
    professorID: number;
    conteudo: string;
  }

  useEffect(() => {
    console.log("useEffect chamado");
    getProfessor();
    obterUser();
  }, []);

  async function getProfessor() {
    const profId = localStorage.getItem("profID");
    if (!profId) {
      console.error("profID não encontrado");
      getprof([]);
      return;
    }

    try {
      const resp = await fetch(`http://localhost:3002/professor/${profId}`);
      if (resp.ok) {
        const data = await resp.json();
        getprof(data);
        setaval((prevState) => ({ ...prevState, professorID: data.id }));
        setaval((prevState) => ({ ...prevState, diciplinaID: data.diciplinaID }));
      } else {
        console.error(`Erro ao buscar professor: ${resp.status}`);
      }
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
    }
  }

  async function obterUser() {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("Token não encontrado");
        getUser([]);
        return;
      }

      const resp = await fetch("http://localhost:3002/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        const text = await resp.text();
        if (text) {
          const data = JSON.parse(text);
          getUser(data);
          setaval((prevState) => ({ ...prevState, usuarioID: data.id }));
        } else {
          console.error("Resposta vazia");
          getUser([]);
        }
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        getUser([]);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário: ", error);
      getUser([]);
    }
  }

  async function criarAval() {
    const conteudo = (document.getElementById('Publicacao') as HTMLTextAreaElement).value;
  
    setaval((prevState) => ({
      ...prevState,
      conteudo: conteudo,
    }));
  

    try {
      const storedToken = localStorage.getItem("token"); 
      if (!storedToken) {
        console.error("Token não encontrado");
        return;
      }
  
      const resp = await fetch("http://localhost:3002/avaliacao", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${storedToken}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...aval,
          conteudo: conteudo, 
        }),
      });
  
      if (resp.ok) {
        console.log(aval);
        alert("Avaliação criada");
        handleClose(); 
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao criar avaliação: ", error);
    }
  }

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Nova Publicação
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Fundo com blur e transparência */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
          {/* Aparência do Modal */}
          <div id="AparenciaDoModal">
            {/* Formulário */}
            <form id="ElementosModal">
              <div>
                {/* Publicação */}
                <textarea
                  name="Publicacao"
                  id="Publicacao"
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                />
              </div>
              {/* Botão Avaliar e Cancelar (Enviar e Fechar) */}
              <div>
                <button id='BotaoCancelar' onClick={handleClose}>Cancelar</button>
                <button id='BotaoAvaliar' onClick={criarAval} type='button'>Avaliar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
