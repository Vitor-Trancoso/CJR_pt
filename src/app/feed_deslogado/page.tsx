export default function Professores() {
  return (
    <div className="w-full h-screen bg-gradient-custom">
      {/* Header */}
      <header className="w-full bg-gray-800 px-8 py-4 flex justify-between items-center shadow-lg">
        <img src="/images/unblogo.jpg" alt="Logo UnB" className="w-35 h-12" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md font-bold hover:bg-blue-600 transition">
          Login
        </button>
      </header>

      {/* Campo de Busca */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-900">
        <h1 className="text-white text-2xl font-bold">Novos Professores</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar Professor(a)"
            className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Novos Professores */}
      <div className="grid grid-cols-4 gap-6 px-8 mt-4">
        {/* Rick Sanchez */}
        <div className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col items-center">
          <img
            src="/images/rick-avatar.png"
            alt="Rick Sanchez"
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="text-white text-lg font-bold mt-2">Rick Sanchez</h2>
          <p className="text-gray-400">Segurança Computacional</p>
        </div>

        {/* Demais professores (genéricos) */}
        {[1, 2, 3].map((professor) => (
          <div
            key={professor}
            className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-blue-300 rounded-full"></div>
            <h2 className="text-white text-lg font-bold mt-2">Nome</h2>
            <p className="text-gray-400">Disciplina</p>
          </div>
        ))}
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Todos os Professores */}
      <div className="px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">
            Todos os Professores
          </h1>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Ordenar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((professor) => (
            <div
              key={professor}
              className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-blue-300 rounded-full"></div>
              <h2 className="text-white text-lg font-bold mt-2">Nome</h2>
              <p className="text-gray-400">Disciplina</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
