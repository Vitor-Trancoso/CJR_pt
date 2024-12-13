'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>({});
  const router = useRouter();


  async function criarUser(){
    
    try {
      const resp = await fetch('http://localhost:3002/user', {
          method: 'POST', 
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify(user)
      })
    
      if(resp.ok) {
        const users = await resp.json();
        setUser({});
        alert('Usuário criado');
        router.push('/login');
      }
      else{
        const errorMessage = await resp.text();
        console.error('Erro ao criar usuário:', errorMessage);
        alert(`Erro ao criar usuário: ${errorMessage}`);
      }
    }
    catch (error){
      console.error('Erro ao criar usuário', error)
    } 

  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br animate-gradient">
      {/* Seção do Formulário */}
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-lg">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold text-white">Criar Conta</h1>
          <p className="text-gray-400 text-lg">
            Comece sua experiência conosco
          </p>
        </div>

        {/* Formulário */}
        <form className="space-y-6">
          <div>
            <input
              id ="name"
              type="text"
              value ={user.name ?? ''}
              onChange={(e) => setUser({...user, name: e.target.value})}
              placeholder="Nome Completo"
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              id = "email"
              type="email"
              value ={user.email ?? ''}
              onChange={(e) => setUser({...user, email: e.target.value})}
              placeholder="Email"
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              id = "senha"
              type="password"
              placeholder="Senha"
              value ={user.senha ?? ''}
              onChange={(e) => setUser({...user, senha: e.target.value})}
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              id = "curso"
              type="text"
              value = {user.curso ?? ''}
              placeholder="Curso"
              onChange={(e) => setUser({...user, curso: e.target.value})}
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              id = "departamento"
              type="text"
              placeholder="Departamento"
              value = {user.departamento ?? ''}
              onChange={(e) => setUser({...user, departamento: e.target.value})}
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button type= "button" onClick={criarUser} className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
