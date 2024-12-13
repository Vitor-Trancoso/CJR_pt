export default function Profile() {
    return (
      <div className="flex flex-col items-center w-full h-screen bg-gradient-to-br animate-gradient">
        {/* Header */}
        <div className="w-full bg-gray-800 flex items-center justify-between px-8 py-4 shadow-lg">
          <img src="/images/unblogo.jpg" alt="Logo UnB" className="w-35 h-12" />
          <button className="text-white bg-blue-500 px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition">
            Login
          </button>
        </div>
  
        {/* Conteúdo Principal */}
        <div className="w-full max-w-4xl bg-gray-900 mt-8 p-8 rounded-xl shadow-xl">
          <div className="flex items-center justify-center mb-6">
            {/* Ícone de Usuário */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-5xl font-bold">?</span>
            </div>
          </div>
  
          {/* Texto de Informação */}
          <div className="text-center">
            <h1 className="text-3xl text-white font-bold">Visitante</h1>
            <p className="text-gray-400 text-lg mt-2">
              Faça login para acessar informações do perfil
            </p>
          </div>
        </div>
  
        {/* Publicações */}
        <div className="w-full max-w-4xl mt-8 bg-gray-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Publicações Recentes
          </h2>
          <div className="flex flex-col gap-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center">
              <p className="text-gray-400">
                Nenhuma publicação disponível no momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }