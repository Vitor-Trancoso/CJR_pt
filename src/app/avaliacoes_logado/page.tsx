"use client";

import { useEffect, useState } from "react";

interface Avaliacao {
  id: number;
  nomeUsuario: string;
  data: string;
  disciplina: string;
  texto: string;
  comentarios: number;
  avatar: string;
}

export default function PerfilLogadoProfessor() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  // Simula dados vindos do back-end
  useEffect(() => {
    const dadosMockados: Avaliacao[] = [
      {
        id: 1,
        nomeUsuario: "Morty Gamer",
        data: "15/04/2024, às 21:42",
        disciplina: "Rick - Viagem Interdimensional",
        texto:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
        comentarios: 5,
        avatar: "/images/morty-avatar.png",
      },
      {
        id: 2,
        nomeUsuario: "El Barto",
        data: "10/04/2024, às 11:12",
        disciplina: "Rick - Estrutura de Dados",
        texto:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature.",
        comentarios: 3,
        avatar: "/images/morty-avatar.png",
      },
    ];

    setAvaliacoes(dadosMockados);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#004aad] to-[#cb6ce6] flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
        <img src="/images/unblogo.jpg" alt="Logo UnB" className="w-35 h-12" />
        {/* Avatar do Usuário Logado */}
        <img
          src="/images/avatar.jpg"
          alt="Avatar do Usuário"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </header>

      {/* Conteúdo Principal */}
      <main className="flex flex-col items-center mt-6">
        {/* Perfil do Professor */}
        <div className="bg-white w-11/12 max-w-4xl rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <img
              src="/images/avatar.jpg"
              alt="Avatar do Professor"
              className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
            />

            {/* Informações do Professor */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Rick Sanchez</h1>
              <p className="text-gray-600 mt-1">Dept. Ciência da Computação</p>
              <p className="text-gray-600">
                Segurança Computacional, Estrutura de Dados, Viagem
                Interdimensional
              </p>
            </div>
          </div>
        </div>

        {/* Avaliações */}
        <div className="w-11/12 max-w-4xl mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Avaliações</h2>

          {/* Lista de Avaliações */}
          <div className="flex flex-col gap-6">
            {avaliacoes.map((avaliacao) => (
              <div
                key={avaliacao.id}
                className="bg-green-100 p-4 rounded-lg shadow-md"
              >
                {/* Avatar e Usuário */}
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={avaliacao.avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-bold">
                      {avaliacao.nomeUsuario}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {avaliacao.data} - {avaliacao.disciplina}
                    </p>
                  </div>
                </div>

                {/* Texto da Avaliação */}
                <p className="text-gray-700">{avaliacao.texto}</p>

                {/* Comentários */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500 text-sm">
                    {avaliacao.comentarios} comentários
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
