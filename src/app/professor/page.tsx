"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PerfilLogadoProfessor() {
  const [professor, setProfessor] = useState<any>([]);
  const [disciplina, setDisciplina] = useState<any>({});
  const [aval, setAval] = useState<{ avaliacoes: any[] }>({ avaliacoes: [] });
  const [userDetails, setUserDetails] = useState<Record<number, any>>({});
  const router = useRouter();


  const proffoto = localStorage.getItem("proffoto");

  function feed(){
    router.push('/')
  }

  useEffect(() => {
    getProfessor();
  }, []);

  useEffect(() => {
    if (aval?.avaliacoes?.length > 0) {
      aval.avaliacoes.forEach((avaliacao: any) => {
        if (!userDetails[avaliacao.usuarioID]) {
          obterUserporID(avaliacao.usuarioID);
        }
      });
    }
  }, [aval]);

  async function obterUserporID(userID: number) {
    try {
      const resp = await fetch(`http://localhost:3002/user/id/${userID}`);
      if (resp.ok) {
        const data = await resp.json();
        setUserDetails((prevDetails) => ({ ...prevDetails, [userID]: data }));
      } else {
        console.error(`Erro ao buscar usuário: ${resp.status}`);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  }

  async function getProfessor() {
    const profId = localStorage.getItem("profID");
    if (!profId) {
      console.error("profID não encontrado");
      setProfessor([]);
      return;
    }

    try {
      const resp = await fetch(`http://localhost:3002/professor/${profId}`);
      if (resp.ok) {
        const data = await resp.json();
        setProfessor(data);
        getProfDisciplina(data.diciplinaID);
        getAvaliacoes(profId);
      } else {
        console.error(`Erro ao buscar professor: ${resp.status}`);
      }
    } catch (error) {
      console.error("Erro ao buscar professor:", error);
    }
  }

  async function getProfDisciplina(id: number) {
    try {
      const resp = await fetch(`http://localhost:3002/diciplina/${id}`);
      if (resp.ok) {
        const data = await resp.json();
        setDisciplina(data);
      } else {
        console.error(`Erro ao buscar disciplina: ${resp.status}`);
      }
    } catch (error) {
      console.error("Erro ao buscar disciplina:", error);
    }
  }

  async function getAvaliacoes(profId: string) {
    try {
      const resp = await fetch(`http://localhost:3002/professor/avals/${profId}`);
      if (resp.ok) {
        const data = await resp.json();
        console.log(data)
        setAval(data);
      } else {
        console.error(`Erro ao buscar avaliações: ${resp.status}`);
      }
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#004aad] to-[#cb6ce6] flex flex-col">
      <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
      <button
          className="w-35 h-12 p-0 bg-transparent border-none focus:outline-none hover:opacity-80 transition"
          onClick={feed}
        >
          <img
            src="/images/unblogo.jpg"
            alt="Logo UnB"
            className="w-full h-full"
          />
        </button>
        
      </header>
      <main className="flex flex-col items-center mt-6">
        <div className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <img
              src= {proffoto!}
              alt="Avatar do Professor"
              className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Prof. {professor.nome}</h1>
              <p className="text-gray-600 mt-1">{professor.departamento}</p>
              <p className="text-gray-600">{disciplina?.nome}</p>
            </div>
          </div>
        </div>
        <div className="w-11/12 max-w-4xl mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Avaliações</h2>
          {aval.avaliacoes.length > 0 ? (
            aval.avaliacoes.map((avaliacao, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/morty-avatar.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-bold">{userDetails[avaliacao.usuarioID]?.name}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(avaliacao.createdt).toLocaleDateString("pt-BR")} -{" "}
                      {new Date(avaliacao.createdt).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">{avaliacao.conteudo}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Nenhuma avaliação ainda.</p>
          )}
        </div>
      </main>
    </div>
  );
}
