"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function EditarPerfilModal() {
  // Estado para controlar a visibilidade do modal
  const [isOpen, setIsOpen] = useState(false);
  // Estado para armazenar a imagem de perfil
  const [profilePicture, setProfilePicture] = useState("/images/avatar.jpg");
  // Estado para controlar a visibilidade dos campos de senha
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // Abre o modal
  // Fecha o modal
  const handleClose = () => setIsOpen(false);
  // Alterna a visibilidade de um campo de senha
  type PasswordFields = {
  currentPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
};

const togglePasswordVisibility = (field: keyof PasswordFields) => {
  setShowPassword((prevState) => ({
    ...prevState,
    [field]: !prevState[field],
  }));
};
  // Atualiza a imagem de perfil
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const [user, getUser] = useState<any>([]);
  const [settedUser, setUser] = useState<any>([])
  const [FullUser, getFullUser] = useState<any>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken); 
        obterUser(); 
      } else {
        
        router.push('/');
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
              setUser(data);
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

      async function updateUser() {
        try {
          const storedToken = localStorage.getItem("token");
          if (!storedToken) {
            console.error("Token não encontrado");
            return;
          }
      
          const userWithId = {
            ...settedUser,
            id: user.id, 
          };
      
          console.log("Payload being sent to the API:", userWithId);
      
          const resp = await fetch(`http://localhost:3002/user/${user.id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userWithId),
          });
      
          if (resp.status == 204 || resp.status == 200) {
            alert("Usuário alterado com sucesso!");
            router.push("/");
          } else {
            console.error(`Erro ao atualizar usuário: ${resp.status} - ${resp.statusText}`);
          }
        } catch (error) {
          console.error("Erro ao atualizar usuário:", error);
        }
      }
      
      const handleOpen = () => {
        setIsOpen(true);
      };

    

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
      >
        Editar Perfil
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Fundo com blur e transparência */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
          {/* Conteúdo do Modal */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6 z-50 transition-transform duration-300 ease-in-out hover:scale-150">
            {/* Botão Fechar */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            {/* Avatar com ícone de câmera */}
            <div className="flex justify-center -mt-20">
              <div
                className="relative rounded-full overflow-hidden bg-gradient-to-r from-gray-300 to-gray-200 p-1"
                style={{
                  width: "100px", // Largura do avatar
                  height: "100px", // Altura do avatar
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Sombra ao redor
                }}
              >
                <img
                  src={profilePicture}
                  alt="Avatar"
                  className="rounded-full object-cover w-full h-full"
                />
                <label
                  htmlFor="profilePictureInput"
                  className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer hover:bg-gray-700"
                  style={{
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Sombra do ícone
                  }}
                >
                  <i className="fas fa-camera"></i>
                </label>
                <input
                  id="profilePictureInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>
            </div>
            {/* Formulário */}
            <form className="space-y-4 mt-6">
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value = {settedUser.name ?? ''}
                  onChange={(e) => setUser({...settedUser, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value = {settedUser.email ?? ''}
                  onChange={(e) => setUser({...settedUser, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Curso"
                  value = {settedUser.curso ?? ''}
                  onChange={(e) => setUser({...settedUser, curso: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Departamento"
                  value = {settedUser.departamento ?? ''}
                  onChange={(e) => setUser({...settedUser, departamento: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Campo Nova Senha */}
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Nova senha"
                  value = {settedUser.senha ?? ''}
                  onChange={(e) => setUser({...settedUser, senha: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.newPassword ? "🔒" : "👀"}
                </button>
              </div>
              {/* Botão Salvar */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={updateUser}
                  className="px-5 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}