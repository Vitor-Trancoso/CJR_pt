import Form from "./fonts/components/Form";

export default function Home() {
  return (
    <div className="flex w-full h-screen bg-gray-900">
      {/* Seção do Formulário */}
      <div className="w-full flex items-center justify-center lg:w-1/2 px-4">
        <Form />
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
