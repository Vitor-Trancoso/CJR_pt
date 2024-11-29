export default function Home() {
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
              type="text"
              placeholder="Nome Completo"
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              className="w-full border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
