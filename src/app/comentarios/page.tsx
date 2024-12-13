'use client'
import { useEffect, useState } from "react"

export default function Home(){

    return(
        <div className="w-full h-screen bg-gradient-to-br animate-gradient flex flex-col">
        <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
            <img src="/images/unblogo.jpg" alt="Logo UnB" className="w-35 h-12" />
            <div className="flex items-center gap-4">
            <button className="text-white">
                <i className="fas fa-bell text-xl"></i>
            </button>
            <img
                src="/images/morty-avatar.png"
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
            />
            </div>
        </header>

        <main className="flex flex-col items-center mt-6">
            <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
                <img
                src="/images/morty-avatar.png"
                alt="Avatar"
                className="w-12 h-12 rounded-full"
                />
                <div>
                <p className="text-white font-bold">Nome do Usuário</p>
                <p className="text-gray-400 text-sm">
                    12/12/2024, às 14:30 - Curso - Departamento
                </p>
                </div>
            </div>
            <p className="text-gray-300 mt-4">Conteúdo do post...</p>

            <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                <button className="text-green-500 hover:text-green-600">
                    <i className="fas fa-edit"></i>
                </button>
                <button className="text-red-500 hover:text-red-600">
                    <i className="fas fa-trash"></i>
                </button>
                </div>
            </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl mt-6">
            <h2 className="text-white text-2xl font-bold mb-4">Comentários</h2>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                <img
                    src="/images/morty-avatar.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="text-white font-bold">Autor do Comentário</p>
                    <p className="text-gray-400 text-sm">
                    12/12/2024, às 15:00
                    </p>
                </div>
                </div>
                <p className="text-gray-300 mt-4">Este é um comentário de exemplo.</p>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                <img
                    src="/images/morty-avatar.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <p className="text-white font-bold">Outro Autor</p>
                    <p className="text-gray-400 text-sm">
                    12/12/2024, às 15:30
                    </p>
                </div>
                </div>
                <p className="text-gray-300 mt-4">Outro comentário de exemplo.</p>
            </div>

            <div className="mt-6">
                <button className="bg-blue-500 text-white mt-4 px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
                Comentar
                </button>
            </div>
            </div>
        </main>
        </div>


    )
}