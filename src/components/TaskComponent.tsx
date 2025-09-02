import { MdDeleteForever } from "react-icons/md";
import { Colors } from "../assets/colors";
import { ToggleComponent } from "./ToggleComponent";
import { getFormattedDate } from "../actions/get-date-formatted";
import type { Task } from "../interfaces/Module";

interface Props {
  item: Task;

  onDelete: (id: number) => void;
  onPublish: (id: string, value: boolean) => void;
}

export const TaskComponent = ({ item, onDelete, onPublish }: Props) => {
  return (
    <div className="shadow-sm shadow-secondary p-2 rounded-xl">
      <div className="px-4">
        <h2 className="font-semibold text-lg text-secondary">{item.title}</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
          <p>
            <span className="font-semibold">Publicado el</span>{" "}
            {getFormattedDate(`${item.publishedDate}`)}
          </p>
          <p>
            <span className="font-semibold">Trabajo disponible hasta el</span>{" "}
            {getFormattedDate(`${item.dueDate}`)}
          </p>
        </div>
        <h2 className="font-semibold text-base">Instrucciones:</h2>
        <p className="whitespace-pre-line my-2">{item.instructions}</p>
        <h2 className="mt-2 font-semibold text-base">Estado de la tarea</h2>
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
            className="flex items-center gap-4 cursor-pointer"
          >
            <p className="font-semibold">¿Eliminar tarea?</p>
            <MdDeleteForever color={Colors.danger} size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
