'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Professores() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const Router = useRouter();
  const [professor, getprofessor] = useState<any>([]);

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
            getprofessor(data); 
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

  const professorsSorted = professor.sort((a: Professor, b: Professor) => b.id - a.id);

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

      {/* Campo de Busca */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-900">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar Professor(a)"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Novos Professores */}
      <div className="px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Novos Professores</h1>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {professorsSorted.length > 0 ? (
            professorsSorted.map((item: Professor) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-300 rounded-full"></div>
                <h2 className="text-gray-800 text-lg font-bold mt-2">{item.nome}</h2>
                <p className="text-gray-500">{item.disciplina ? item.disciplina.nome : 'Sem Disciplina'}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-2">
                    <div className="text-green-500 hover:text-green-600 cursor-pointer">
                      <i className="fas fa-edit"></i>
                    </div>
                    <div className="text-red-500 hover:text-red-600 cursor-pointer">
                      <i className="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
              <p className="text-gray-300 text-center">Nenhum professor cadastrado.</p>
            </div>
          )}
        </div>
        <hr className="my-6 border-gray-600" />
      </div>

      {/* Todos os Professores */}
      <div className="px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Todos os Professores</h1>
          <div className="flex gap-4">
            {isLoggedIn && (
              <>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Nova Publicação
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                  Ordenar
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {professorsSorted.length > 0 ? (
            professorsSorted.map((item: Professor) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-300 rounded-full"></div>
                <h2 className="text-gray-800 text-lg font-bold mt-2">{item.nome}</h2>
                <p className="text-gray-500">{item.disciplina ? item.disciplina.nome : 'Sem Disciplina'}</p>
              </div>
            ))
          ) : (
            <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
              <p className="text-gray-300 text-center">Nenhum professor cadastrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


