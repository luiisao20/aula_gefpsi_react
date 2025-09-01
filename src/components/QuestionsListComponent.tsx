import { GrRadialSelected } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

import type { QuestionWithOptions } from "../interfaces/Module";
import { Colors } from "../assets/colors";

interface Props {
  questions: QuestionWithOptions[];
  isDeleting: boolean;

  onDelete: (idQuestion: string) => void;
}

export const QuestionsListComponent = ({
  questions,
  isDeleting,

  onDelete,
}: Props) => {
  return (
    <div className="mx-4">
      {questions.length > 0 ? (
        <div>
          <h2 className="font-semibold text-secondary text-center text-lg my-4">
            Preguntas del examen
          </h2>
          <div className="flex flex-col space-y-2 mb-4">
            {questions.map((item, index) => (
              <div key={item.id}>
                <div className="font-semibold mb-2 text-primary text-justify flex justify-between items-center mr-10">
                  <span>
                    {index + 1}. {item.text}
                  </span>
                  <button
                    disabled={isDeleting}
                    onClick={() => onDelete(item.id?.toString()!)}
                    className="cursor-pointer"
                  >
                    <MdDeleteForever className="text-3xl text-danger" />
                  </button>
                </div>
                {item.options.length > 0 ? (
                  <ul className="list-inside mx-4 space-y-4">
                    {item.options.map((option) => (
                      <div key={option.id} className="flex gap-4 text-justify">
                        <GrRadialSelected
                          color={option.isCorrect ? Colors.secondary : "black"}
                        />
                        <li>{option.text}</li>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <div className="mx-4">
                    <textarea
                      id="message"
                      rows={2}
                      disabled
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Respuesta..."
                    ></textarea>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="font-semibold text-secondary text-center my-4 text-lg">
          No existen preguntas para este examen, agrega una.
        </h2>
      )}
    </div>
  );
};
