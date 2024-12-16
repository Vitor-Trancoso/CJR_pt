export default function Home() {
    return (
      <div className="flex w-full h-screen bg-gray-900">
        {/* Seção do Formulário */}
        <div className="w-full flex items-center justify-center lg:w-1/2 px-4">
          <div className="bg-gray-800 px-10 py-20 rounded-3xl border-2 border-gray-700 shadow-lg">
            <h1 className="text-5xl font-semibold text-white">
              Avaliação de Professores
            </h1>
            <p className="font-medium text-lg text-gray-400 mt-4">
              Cadastre seus Dados
            </p>
            <div className="mt-8">
              <div>
                <label className="text-lg font-medium text-gray-300">Email</label>
                <input
                  className="w-full border-2 border-gray-600 rounded-xl p-4 mt-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu Email"
                  type="email"
                />
              </div>
              <div className="mt-6">
                <label className="text-lg font-medium text-gray-300">Senha</label>
                <input
                  className="w-full border-2 border-gray-600 rounded-xl p-4 mt-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua senha"
                  type="password"
                />
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    className="accent-green-500"
                  />
                  <label
                    className="ml-2 font-medium text-gray-300"
                    htmlFor="remember"
                  >
                    Lembre de mim
                  </label>
                </div>
                <button className="font-medium text-green-400 hover:underline">
                  Esqueci a Senha
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button className="py-3 rounded-xl bg-green-500 text-white text-lg font-bold hover:bg-green-600 active:scale-95 transition">
                  Entrar
                </button>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-gray-400">Não possui conta?</p>
                <button className="text-green-400 font-medium ml-2 hover:underline">
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Seção da Imagem e Texto */}
        <div className="hidden relative lg:flex h-full w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#004aad] to-[#cb6ce6] bg-gradient-to-br animate-gradient">
          <img
            src="/images/unblogo.jpg"
            alt="Logo da UnB"
            className="w-1/3 mx-auto mb-6"
          />
          <p className="text-xl text-white font-medium">
            Avaliação de Professores
          </p>
        </div>
      </div>
    );
  }