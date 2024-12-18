'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import NovaPublicacaoModal from './components/NewPublicationModal';
import NovoProfessorModal from './components/CriarProf';

export default function Professores() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Router = useRouter();
  const [professor, getprofessor] = useState<any>([]);
  const [professorDetails, setprofessorDetails] = useState<Record<number, any>>({});
  const [currentPage, setCurrentPage] = useState(0); // Página atual para navegação dos professores

  const imagensPerfil = [
    '/images/Katniss.jpg',
    '/images/Peeta.jpg',
    '/images/haymitch.jpg',
    '/images/effie.jpg',
    '/images/snow.jpg',
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  function login() {
    Router.push('/login');
  }

  function perfil() {
    Router.push('/perfil_logado');
  }

  interface Professor {
    id: number;
    nome: string;
    departamento: string;
    diciplinaID: number;
    createdt: string;
    updateddt: string;
    disciplina?: {
      id: number;
      nome: string;
    };
    avaliacoes?: Array<{
      id: number;
      descricao: string;
    }>;
    fotoPerfil?: string;
  }

  useEffect(() => {
    async function getprof() {
      try {
        const resp = await fetch("http://localhost:3002/professor", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (resp.ok) {
          const text = await resp.text();
          if (text) {
            const data = JSON.parse(text);
            const professoresComFoto = data.map((prof: Professor, index: number) => ({
              ...prof,
              fotoPerfil: imagensPerfil[index % imagensPerfil.length],
            }));
            getprofessor(professoresComFoto);
          } else {
            console.error("Resposta vazia");
            getprofessor([]);
          }
        } else {
          console.error(`Erro: ${resp.status} - ${resp.statusText}`);
          getprofessor([]);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
        getprofessor([]);
      }
    }
    getprof();
  }, []);

  const professorsSorted = [...professor].sort((a, b) => b.id - a.id);

  async function getdisciplina(id: number) {
    try {
      const resp = await fetch(`http://localhost:3002/diciplina/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        const text = await resp.text();
        if (text) {
          const data = JSON.parse(text);
          setprofessorDetails((prevDetails) => ({
            ...prevDetails,
            [id]: data,
          }));
        } else {
          console.error("Resposta vazia");
        }
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao buscar disciplinas: ", error);
    }
  }

  useEffect(() => {
    professorsSorted.forEach((professor) => {
      if (!professorDetails[professor.diciplinaID]) {
        getdisciplina(professor.diciplinaID);
      }
    });
  }, [professorsSorted]);

  function pagprofessor(id: number, foto:string) {
    localStorage.setItem('profID', id.toString());  
    localStorage.setItem('proffoto', foto);  
    Router.push('/professor');
  }

  const professorsPerPage = 4; // Professores exibidos por página
  const paginatedProfessors = professorsSorted.slice(
    currentPage * professorsPerPage,
    (currentPage + 1) * professorsPerPage
  );

  return (
    <div className="w-full h-screen bg-gradient-custom">
      {/* Header */}
      <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
        <img src="/images/unblogo.jpg" alt="Logo UnB" className="w-35 h-12" />
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button className="text-white">
                <i className="fas fa-bell text-xl"></i>
              </button>
              <button
                className="w-20 h-20 rounded-full border-2 border-white p-1 focus:outline-none hover:opacity-80 transition"
                onClick={perfil}
              >
                <img
                  src="/images/morty-avatar.png"
                  alt="Avatar"
                  className="w-full h-full rounded-full"
                />
              </button>
            </>
          ) : (
            <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md font-bold hover:bg-blue-600 transition">
              Login
            </button>
          )}
        </div>
      </header>

      {/* Novos Professores */}
      <div className="px-8">
        <h1 className="text-white text-2xl font-bold">Novos Professores</h1>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {professorsSorted.slice(0, 4).map((item: Professor) => (
            <button
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center focus:outline-none hover:opacity-80 transition"
              onClick={() => pagprofessor(item.id, item.fotoPerfil!)}
            >
              <img
                src={item.fotoPerfil}
                alt={`Foto de ${item.nome}`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h2 className="text-gray-800 text-lg font-bold mt-2">{item.nome}</h2>
              <p className="text-gray-500">{professorDetails[item.diciplinaID]?.nome}</p>
            </button>
          ))}
        </div>
        <hr className="my-6 border-gray-600" />
      </div>

      {/* Todos os Professores */}
      <div className="px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Todos os Professores</h1>
          {isLoggedIn && <NovoProfessorModal />}
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {paginatedProfessors.map((item: Professor) => (
            <button
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center focus:outline-none hover:opacity-80 transition"
              onClick={() => pagprofessor(item.id, item.fotoPerfil!)}
            >
              <img
                src={item.fotoPerfil}
                alt={`Foto de ${item.nome}`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <h2 className="text-gray-800 text-lg font-bold mt-2">{item.nome}</h2>
              <p className="text-gray-500">{professorDetails[item.diciplinaID]?.nome}</p>
            </button>
          ))}
        </div>
        {/* Navegação */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md font-bold hover:bg-gray-700 transition"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md font-bold hover:bg-gray-700 transition"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
