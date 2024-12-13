'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditarPerfilModal from "../components/EditPerfilModal";

export default function Profile() {

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [user, getUser] = useState<any>([]);
  const [FullUser, getFullUser] = useState<any>([])
  const [post, getPosts] = useState<any[]>([])
  const [comments, countcomments] = useState<any>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); 
        obterUser(); 
      } else {
        
        router.push('/perfil_deslogado');
    }
    obterUser()}
    }, [router]);
  useEffect(() => {
    if (user.id) {
      obterFullUser();
      }
    }, [user.id]);
    useEffect(() => {
      if (user.id) {
        findPosts();
        }
      }, [user.id]);
    
      function comentarios(id: number) {  
        localStorage.setItem('avalID', id.toString());  
        router.push("/comentarios");
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
        router.push("/login")
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

  async function findPosts() {
    try{
      const storedToken = localStorage.getItem("token"); 
      if (!storedToken) {
        console.error("Token não encontrado");
        getUser([]);
        return;
      }
      const resp = await fetch(`http://localhost:3002/user/posts/${user.id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${storedToken}`, 
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
          const text = await resp.text();
          const data = JSON.parse(text);
          console.log("Dados da API:", data);
          getPosts(data.avaliacoes || []);
        }
      else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
        getPosts([]);
      }
    }
    catch (error) {
      console.error("Erro ao buscar posts: ", error);
      getPosts([]);
    }
  }

  async function countComments(postId: number){
    try{
      const storedToken = localStorage.getItem("token"); 
      if (!storedToken) {
        console.error("Token não encontrado");
        getUser([]);
        return;
      }
      const resp = await fetch(`http://localhost:3002/avaliacao/countcomments/${postId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${storedToken}`, 
          "Content-Type": "application/json",
        },
      });
      if (resp.ok) {
          const text = await resp.text();
          const data = JSON.parse(text);
          console.log("Dados da API:", data);
          countcomments(data)
        }
      else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
      }
    }
    catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("/"); 
  }

  function feed(){
    router.push('/')
  }


  return (
    <div className="w-full h-screen bg-gradient-to-br animate-gradient flex flex-col">
      {/* Header */}
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
            <EditarPerfilModal />
            <button type="button" onClick={deleteUser} className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600">
              Excluir Perfil
            </button>
            <button type="button" onClick={logout} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Sair
            </button>
          </div>
        </div>

        {/* Publicações */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl mt-6">
          <h2 className="text-white text-2xl font-bold mb-4">Publicações</h2>

          {/* Lista de Publicações */}
          <div className="flex flex-col gap-6">
            {post.length > 0 ? (
              <ul>
                {post.map((post) => (
                  
                  <li key={post.id} className="mb-4">
                    <button
                      onClick={() => comentarios(post.id)}
                      className="w-full bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src="/images/morty-avatar.png"
                          alt="Avatar"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="text-white font-bold">{user.name}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(post.createdt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                            , às{" "}
                            {new Date(post.createdt).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            - {FullUser.curso} - {FullUser.departamento}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-4 text-left">{post.conteudo}</p>
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
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
                <p className="text-gray-300 text-center">
                  Você ainda não tem publicações.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
