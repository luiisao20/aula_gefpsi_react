import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

import { Colors } from "../assets/colors";
import { ToggleComponent } from "./ToggleComponent";
import { getFormattedDate } from "../actions/get-date-formatted";
import { FileInput } from "./FileInput";

import type { Task } from "../interfaces/Module";
import type { Assignment } from "../interfaces/Tasks";

interface Props {
  item: Task;
  student?: boolean;
  assignment?: Assignment;
  deleteLoading?: boolean;
  uploadLoading?: boolean;

  onDelete?: (id: number) => void;
  onDeleteAssignment?: (idTask: number, path: string) => void;
  onPublish?: (id: string, value: boolean) => void;
  onUploadTask?: (file: File) => void;
}

export const TaskComponent = ({
  item,
  student,
  assignment,
  deleteLoading,
  uploadLoading,

  onDelete = () => {},
  onDeleteAssignment = () => {},
  onPublish = () => {},
  onUploadTask = () => {},
}: Props) => {
  const [taskFile, setTaskFile] = useState<File | null>();

  return (
    <div className="shadow-sm shadow-secondary p-2 rounded-xl">
      <div className="px-4">
        <h2 className="font-semibold text-lg text-secondary">{item.title}</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
          <p>
            <span className="font-semibold">Publicado el:</span>{" "}
            {getFormattedDate(`${item.publishedDate}`)}
          </p>
          <p>
            <span className="font-semibold">Trabajo disponible hasta el:</span>{" "}
            {getFormattedDate(`${item.dueDate}`)}
          </p>
        </div>
        <h2 className="font-semibold text-base">Instrucciones:</h2>
        <p className="whitespace-pre-line my-2">{item.instructions}</p>
        {student ? (
          assignment ? (
            <div>
              <h2 className="text-center text-xl font-semibold text-secondary">
                La tarea ya ha sido entregada
              </h2>
              <div className="flex flex-col md:flex-row justify-between px-6 py-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={assignment.url}
                  className="cursor-pointer hover:underline hover:underline-offset-2"
                >
                  {assignment.fileName}
                </a>
                {!assignment.grade && (
                  <button
                    onClick={() =>
                      onDeleteAssignment(item.id!, assignment.path)
                    }
                    disabled={deleteLoading}
                    className={`flex items-center gap-4 cursor-pointer ${
                      deleteLoading && "cursor-progress"
                    }`}
                  >
                    <p className="font-semibold">¿Eliminar entrega?</p>
                    <MdDeleteForever color={Colors.danger} size={30} />
                  </button>
                )}
              </div>
              {assignment.grade && (
                <div>
                  <h2 className="text-center text-base">
                    <span className="font-semibold">Calificación:</span>{" "}
                    {assignment.grade} / 10
                  </h2>
                  <h2 className="text-base">
                    <span className="font-semibold">Fecha:</span>{" "}
                    {getFormattedDate(assignment.gradedAt!)}
                  </h2>
                  <h2 className="font-semibold my-2">Comentarios</h2>
                  <p className="whitespace-pre-line px-4">{assignment.feedback}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <FileInput
                description="para subir el archivo de la tarea"
                format=".pdf"
                setFile={(file) => setTaskFile(file)}
              />
              <button
                onClick={() => {
                  if (taskFile) onUploadTask(taskFile);
                  else alert("Debes subir una archivo primero!");
                }}
                disabled={uploadLoading}
                className={`text-white p-2 font-semibold text-center bg-secondary rounded-xl place-self-end cursor-pointer hover:bg-secondary/60 ${
                  uploadLoading && "cursor-progress"
                }`}
              >
                Entregar tarea
              </button>
            </div>
          )
        ) : (
          <div>
            <h2 className="mt-2 font-semibold text-base">
              Estado de la tarea {student}
            </h2>
            <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
              <div className="flex items-center gap-4 mt-2 ml-4">
                <ToggleComponent
                  id={`${item.id}`}
                  checked={item.status ? item.status : false}
                  onChange={(value) => onPublish(item.id?.toString()!, value)}
                />
                <p className="font-semibold text-secondary">
                  {item.status ? "Habilitado" : "Deshabilitado"}
                </p>
              </div>
              <button
                onClick={() => onDelete(item.id!)}
                disabled={deleteLoading}
                className={`flex items-center gap-4 cursor-pointer ${
                  deleteLoading && "cursor-progress"
                }`}
              >
                <p className="font-semibold">¿Eliminar tarea?</p>
                <MdDeleteForever color={Colors.danger} size={30} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
