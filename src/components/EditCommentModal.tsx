"use client";

import { useState } from "react";
import './EditCommentModal.css';

export default function EditarComentarioModal() {

  // Estado para controlar a visibilidade do modal
  const [isOpen, setIsOpen] = useState(false);

  // Abre o modal
  const handleOpen = () => setIsOpen(true);

  // Fecha o modal
  const handleClose = () => setIsOpen(false);


  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Nova Publicação
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Fundo com blur e transparência */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Aparência do Modal */}
          <div id="AparenciaDoModal" /*className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6 z-50 transition-transform duration-300 ease-in-out hover:scale-150"*/ >
        

            {/* Formulário */}
            <form id="ElementosModal" /*className="space-y-4 mt-6"*/>
              
              <div>
                {/* Botões da Publicação*/}
              <div id='Botoes'>
                <button id='Negrito'>B</button>
                <button id='Italico'>I</button>
                <button id='H'>H</button>
                <button id='Link'>L</button>
                <button id='Imagem'>F</button>
                <button id='Sobre'>?</button>
             </div>

                {/* Publicação*/}
                <textarea name="Publicacao" id="Publicacao"></textarea>  
              </div>

                {/* Botão Lixeira, Editar e Cancelar (Deletar, Enviar e Fechar) */}
              <div> 
                <button id="Lixeira"> <img src="/images/trash-can.png" alt="Logo UnB" className="w-22 h-12" /> </button>
                <button id='BotaoCancelar' onClick={handleClose}>Cancelar</button>
                <button id='BotaoEditar' type='submit'>Editar</button>
              </div>

            </form> 
          </div>
        </div>
      )}
    </div>
  );
}