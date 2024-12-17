
  return (
    <div className="w-full h-screen bg-gradient-to-br animate-gradient flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">

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

          </div>

          {/* Botões de Ação */}
          <div className="flex justify-center mt-6 gap-4">

          </div>
        </div>

        {/* Publicações */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-11/12 max-w-4xl mt-6">
          <h2 className="text-white text-2xl font-bold mb-4">Publicações</h2>

          {/* Lista de Publicações */}
          <div className="flex flex-col gap-6">

          </div>
        </div>
      </main>
    </div>
  );

