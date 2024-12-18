"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoProfessorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [disciplina, setDisciplina] = useState("");
  const [loading, setLoading] = useState(false);
  const Router = useRouter();
  const [professor, setProfessor] = useState<Professor>({
    nome: "",
    departamento: "",
    diciplinaID: 0,
  });

  // Abre/Fecha o modal
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  interface Professor {
    nome: string;
    departamento: string;
    diciplinaID: number;
  }

  useEffect(() => {
    if (professor.diciplinaID !== 0) {
      createProf();
      handleClose();
    }
  }, [professor.diciplinaID]);
  

  useEffect(() => {
    console.log("Estado atualizado:", professor);
  }, [professor]);

  function creating() {
    console.log("Disciplina digitada:", disciplina);
    checkDisciplina(disciplina);
  }

  async function createProf() {
    try {
      const resp = await fetch("http://localhost:3002/professor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(professor),
      });
      if (resp.ok) {
        alert("Professor criado");
      } else {
        console.error(`Erro: ${resp.status} - ${resp.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao criar professor: ", error);
    }
  }

  async function checkDisciplina(Dnome: string) {
    try {
      const resp = await fetch(`http://localhost:3002/diciplina/nome/${Dnome}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data && data.id) {
        console.log("Disciplina existe, ID:", data.id);
        setProfessor((prevState) => ({ ...prevState, diciplinaID: data.id }));
      } else {
        createdisciplina(Dnome);
      }
    } catch (error) {
      console.error("Erro ao buscar disciplina: ", error);
    }
  }

  async function createdisciplina(Dnome: string) {
    try {
      const resp = await fetch("http://localhost:3002/diciplina", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: Dnome }),
      });
      if (resp.ok) {
        const data = await resp.json();
        console.log("Disciplina criada, ID:", data.id);
        setProfessor((prevState) => ({ ...prevState, diciplinaID: data.id }));
      }
    } catch (error) {
      console.error("Erro ao criar disciplina: ", error);
    }
  }

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Novo Professor
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Fundo com blur e transparência */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* Aparência do Modal */}
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6 z-50">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Professor</h2>
            {/* Nome */}
            <div>
              <label className="block text-gray-700">Nome:</label>
              <input
                type="text"
                value={professor.nome}
                onChange={(e) =>
                  setProfessor({ ...professor, nome: e.target.value })
                }
                placeholder="Nome do professor"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Disciplina */}
            <div>
              <label className="block text-gray-700">Disciplina:</label>
              <input
                type="text"
                value={disciplina}
                onChange={(e) => setDisciplina(e.target.value)}
                placeholder="Disciplina"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Departamento */}
            <div>
              <label className="block text-gray-700">Departamento:</label>
              <input
                type="text"
                value={professor.departamento}
                onChange={(e) =>
                  setProfessor({
                    ...professor,
                    departamento: e.target.value,
                  })
                }
                placeholder="Departamento"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={creating}
                className={`px-4 py-2 text-white rounded-lg ${
                  loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {loading ? "Salvando..." : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
