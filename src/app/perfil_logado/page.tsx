'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [user, getUser] = useState<any>([]);
  const [FullUser, getFullUser] = useState<any>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); 
        obterUser(); 
      } else {
        
        router.push('/login');
    }
    obterUser()}
    }, [router]);
  useEffect(() => {
    if (user.id) {
      obterFullUser();
      }
    }, [user.id]);


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
  async function deleteUser(){
    const storedToken = localStorage.getItem("token"); 
    try{
      if (!user.id) { 
        console.error('User ID is not set'); 
        return; 
      }
      const resp = await fetch(`http://localhost:3002/user/${user.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${storedToken}`, 
            "Content-Type": "application/json",
          },
      })
      if (resp.ok){
        alert('usuário deletado')
        router.push("/")
      }
      else{
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        const errorMessage = await resp.text();
        console.error("Erro ao deletar usuário", errorMessage)
      }
    }
    catch (error){
      console.error('Erro ao criar usuário', error)
    } 
  }

  async function obterFullUser() {
    try {
      const storedToken = localStorage.getItem("token"); 
      if (!storedToken) {
        console.error("Token não encontrado");
        getUser([]);
        return;
      }
  
      const resp = await fetch(`http://localhost:3002/user/id/${user.id}`, {
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
          getFullUser(data);
        } else {
          console.error("Resposta vazia");
          getFullUser([]);
        }
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        getFullUser([]);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário: ", error);
      getFullUser([]);
    }
  }


  return (
    <div className="w-full h-screen bg-gradient-to-br animate-gradient flex flex-col">
      {/* Header */}
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

      {/* Conteúdo Principal */}
      <main className="flex flex-col items-center mt-6">
        {/* Informações do Perfil */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl">
          <div className="flex flex-col items-center">
            <img
              src="/images/morty-avatar.png"
              alt="Avatar do Usuário"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
            <h1 className="text-white text-3xl font-bold mt-4">{user.name}</h1>
            <p className="text-gray-400 text-sm mt-2">
              {FullUser.curso} / {FullUser.departamento}
            </p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-center mt-6 gap-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Editar Perfil
            </button>
            <button type= "button" onClick={deleteUser} className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600">
              Excluir Perfil
            </button>
          </div>
        </div>

        {/* Publicações */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl mt-6">
          <h2 className="text-white text-2xl font-bold mb-4">Publicações</h2>

          {/* Lista de Publicações */}
          <div className="flex flex-col gap-6">
            {/* Publicação 1 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <img
                  src="/images/morty-avatar.png"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white font-bold">Morty Gamer</p>
                  <p className="text-gray-400 text-sm">
                    17/04/2024, às 21:42 - João Frango - Surf
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-400 text-sm">2 comentários</p>
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

            {/* Publicação 2 */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <img
                  src="/images/morty-avatar.png"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white font-bold">Morty Gamer</p>
                  <p className="text-gray-400 text-sm">
                    15/04/2024, às 21:42 - Rick - Viagem Interdimensional
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mt-4">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-400 text-sm">5 comentários</p>
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
          </div>
        </div>
      </main>
    </div>
  );
}
