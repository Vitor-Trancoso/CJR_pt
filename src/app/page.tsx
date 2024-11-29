import Form from "./fonts/components/Form";

export default function Home() {
  return (
    <div className="flex w-full h-screen bg-gray-900">
      {/* Seção do Formulário */}
      <div className="w-full flex items-center justify-center lg:w-1/2 px-4">
        <Form />
      </div>
      {/* Seção da Imagem e Texto */}
      <div className="hidden relative lg:flex h-full w-1/2 flex-col items-center justify-center bg-gradient-to-br from-[#004aad] to-[#cb6ce6]">
        {/* Imagem */}
        <img
          src="/images/unblogo.jpg"
          alt="Logo da Universidade"
          className="w-1/4 h-auto mb-4" /* Ajuste no tamanho da imagem */
        />
        {/* Texto Abaixo da Imagem */}
        <p className="text-white text-lg font-bold">Avaliação de Professores</p>
      </div>
    </div>
  );
}
