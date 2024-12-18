'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import ComentarioModal from "../components/CommentModal";

export default function Home(){
    const [aval, getAval] = useState<any>([]);
    const [user, getUser] = useState<any>([]);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<Record<number, any>>({});


    useEffect(() => {
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            setToken(storedToken); 
            getAvalia(); 
          } else {
            
            router.push('/');
        }
        const avalId = localStorage.getItem("avalID");
            if (!avalId) {
                console.error("AvalId não encontrado");
                getAval([]);
                return;
              }
        getAvalia()}
        }, [router]);

    useEffect(() => {
        if (aval.comentarios && aval.comentarios.length > 0) {
        aval.comentarios.forEach((comentario: any) => {
            if (!userDetails[comentario.userID]) {
            obterUserporID(comentario.userID);
            }
        });
        }
    }, [aval]);

    useEffect(() => {
        if (aval.usuarioID) {
          obterUserporID(aval.usuarioID); 
        }
      }, [aval.usuarioID]);

    async function getAvalia(){
        try {
            const storedToken = localStorage.getItem("token"); 
            if (!storedToken) {
              console.error("Token não encontrado");
              getAval([]);
              return;
            }
            const avalId = localStorage.getItem("avalID");
            if (!avalId) {
                console.error("AvalId não encontrado");
                getAval([]);
                return;
              }
        
            const resp = await fetch(`http://localhost:3002/avaliacao/comments/${avalId}`, {
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
                console.log("Dados getavalia:", data);
                getAval(data);
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

        async function obterUserporID(userID: number) {
            try {
              const storedToken = localStorage.getItem("token"); 
              if (!storedToken) {
                console.error("Token não encontrado");
                getUser([]);
                return;
              }
          
              const resp = await fetch(`http://localhost:3002/user/id/${userID}`, {
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
                  setUserDetails((prevDetails) => ({ ...prevDetails, [userID]: data }));
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
                    <p className="text-white font-bold"> {userDetails[aval.usuarioID]?.name} </p>
                    <div>
                        <p className="text-gray-400 text-sm">
                            {new Date(aval.createdt).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                            , às{" "}
                            {new Date(aval.createdt).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            - {userDetails[aval.usuarioID]?.curso} - {userDetails[aval.usuarioID]?.departamento}
                        </p>
                    </div>                              
                </div>
            </div>
            <p className="text-gray-300 mt-4">{aval.conteudo}</p>

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

          {aval.comentarios && aval.comentarios.length > 0 ? (
            aval.comentarios.map((comentario: any, index: number) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/images/morty-avatar.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-bold">{userDetails[comentario.userID]?.name}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(comentario.createdt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })} - {new Date(comentario.createdt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4">{comentario.conteudo}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">Nenhum comentário ainda.</p>
          )}

          <div className="mt-6">
            <ComentarioModal/>
          </div>
        </div>
      </main>
    </div>
  );
}