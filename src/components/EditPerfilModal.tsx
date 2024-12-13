"use client";

import { useState } from "react";

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
  const handleOpen = () => setIsOpen(true);

  // Fecha o modal
  const handleClose = () => setIsOpen(false);

  // Alterna a visibilidade de um campo de senha
  const togglePasswordVisibility = (field: string) => {
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Curso"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Departamento"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Campo Senha Atual */}
              <div className="relative">
                <input
                  type={showPassword.currentPassword ? "text" : "password"}
                  placeholder="Senha atual"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("currentPassword")}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.currentPassword ? "🔒" : "👀"}
                </button>
              </div>

              {/* Campo Nova Senha */}
              <div className="relative">
                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  placeholder="Nova senha"
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

              {/* Campo Confirmar Nova Senha */}
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirmar nova senha"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-4 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword.confirmPassword ? "🔒" : "👀"}
                </button>
              </div>

              {/* Botão Salvar */}
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
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