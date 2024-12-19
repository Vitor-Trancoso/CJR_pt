"use client";

import { useEffect, useState } from "react";
import './CommentModal.css';
import { useRouter } from "next/navigation";

export default function ComentarioModal() {

  // Estado para controlar a visibilidade do modal
  const [isOpen, setIsOpen] = useState(false);

  // Abre o modal
  const handleOpen = () => setIsOpen(true);

  // Fecha o modal
  const handleClose = () => setIsOpen(false);

  const [user, getUser] = useState<any>([]);
  const [aval, getAval] = useState<any>([]);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [newcomment, setnewComment] = useState<Comentario>({
    userID: 0,
    avalID: 0,
    conteudo: ""
  });

  interface Comentario {
    userID: number;
    avalID: number;
    conteudo: string;
  }

  useEffect(() => {
    getAvaliacao()
    getUsuario()
    }, []);
  
  
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setnewComment({
        ...newcomment,
        conteudo: e.target.value, 
      });
    }; 

  async function getAvaliacao(){
    try {

      const avalId = localStorage.getItem("avalID");
      if (!avalId) {
          console.error("AvalId não encontrado");
          getAval([]);
          return;
        }
  
      const resp = await fetch(`http://localhost:3002/avaliacao/comments/${avalId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (resp.ok) {
        const text = await resp.text();
        if (text) {
          const data = JSON.parse(text);
          console.log("Dados getavalia:", data);
          getAval(data);
          setnewComment((prevState) => ({ ...prevState, avalID: data.id }));
        } else {
          console.error("Resposta vazia");
          getAval([]);
        }
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        getAval([]);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário: ", error);
      getAval([]);
    }
  }

  async function getUsuario(){
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
          setnewComment((prevState) => ({ ...prevState, userID: data.id }));
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

  async function createComment() {
    try {
      const storedToken = localStorage.getItem("token"); 
      if (!storedToken) {
        console.error("Token não encontrado");
        getUser([]);
        return;
      }
      const resp = await fetch("http://localhost:3002/comments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newcomment),
      });
      console.log(newcomment)
      if (resp.ok) {
        console.log("entrou")
        alert("comentário publicado")
        router.refresh();
      }
    } catch (error) {
      console.error("Erro ao criar comentario: ", error);
    }
  }

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Comentar
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Fundo com blur e transparência */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Aparência do Modal */}
          <div id="AparenciaDoModal" /*className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6 z-50 transition-transform duration-300 ease-in-out hover:scale-150"*/ >
        

            {/* Formulário */}
            <form id="ElementosModal" /*className="space-y-4 mt-6"*/>
              
              <div>
                {/* Botões da Publicação*/}
              <div id='Botoes'>
                <button id='Negrito'>B</button>
                <button id='Italico'>I</button>
                <button id='H'>H</button>
                <button id='Link'>L</button>
                <button id='Imagem'>F</button>
                <button id='Sobre'>?</button>
             </div>

                {/* Publicação*/}
                <div>
                  <textarea 
                    name="Publicacao" 
                    id="Publicacao" 
                    value={newcomment.conteudo} 
                    onChange={handleCommentChange}
                  ></textarea>
                </div> 
              </div>

                {/* Botão Comentar e Cancelar (Enviar e Fechar) */}
              <div>  
                <button id='BotaoCancelar' onClick={handleClose}>Cancelar</button>
                <button id='BotaoComentar' onClick={createComment} type='button'>Comentar</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}