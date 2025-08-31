import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaBook } from "react-icons/fa6";

import {
  ModalComponent,
  ModalTask,
  type ModalRef,
} from "../../../components/ModalComponent";
import type { Task } from "../../../interfaces/Module";
import { useTasks } from "../../../presentation/modules/useTasks";
import { getFormattedDate } from "../../../actions/get-date-formatted";
import { ToggleComponent } from "../../../components/ToggleComponent";
import { MdDeleteForever } from "react-icons/md";
import { Colors } from "../../../assets/colors";

interface ConfirmDialog {
  message: string;
  showButtons: boolean;
  idTask: number;
  loading: boolean;
}

export const TasksModule = () => {
  const modalRef = useRef<ModalRef>(null);
  const modalConfirm = useRef<ModalRef>(null);
  const { id } = useParams();
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const { tasksQuery, publishMutation, deleteTaskMutation } = useTasks(`${id}`);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog>({
    message: "¿Estás seguro de eliminar la tarea?",
    showButtons: false,
    idTask: 0,
    loading: deleteTaskMutation.isPending,
  });

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  return (
    <div className="my-4">
      <ModalComponent
        loading={confirmDialog.loading}
        ref={modalConfirm}
        message={confirmDialog.message}
        showButtons={confirmDialog.showButtons}
        onAccept={async() => {

          await deleteTaskMutation.mutateAsync(confirmDialog.idTask.toString())
          setConfirmDialog(prev => ({
            ...prev,
            message: 'Registro eliminado exitosamente',
            showButtons: false
          }))
        }
        }
      />
      <ModalTask moduleId={`${id}`} ref={modalRef} />
      <div className="flex flex-col md:flex-row justify-between items-center md:px-10">
        <h2 className="text-base">¿Deseas crear una nueva tarea?</h2>
        <button
          onClick={() => modalRef.current?.show()}
          className="flex items-center bg-secondary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60"
        >
          <FaBook size={20} />
          <span className="text-base">Añadir</span>
        </button>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        {tasksList.map((item, index) => (
          <div
            key={index}
            className="shadow-sm shadow-secondary p-2 rounded-xl"
          >
            <div className="px-4">
              <h2 className="font-semibold text-lg text-secondary">
                {item.title}
              </h2>
              <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
                <p>
                  <span className="font-semibold">Publicado el</span>{" "}
                  {getFormattedDate(`${item.publishedDate}`)}
                </p>
                <p>
                  <span className="font-semibold">
                    Trabajo disponible hasta el
                  </span>{" "}
                  {getFormattedDate(`${item.dueDate}`)}
                </p>
              </div>
              <h2 className="font-semibold text-base">Instrucciones:</h2>
              <p className="whitespace-pre-line my-2">{item.instructions}</p>
              <h2 className="mt-2 font-semibold text-base">
                Estado de la tarea
              </h2>
              <div className="flex flex-col md:flex-row space-y-2 md:justify-between my-2">
                <div className="flex items-center gap-4 mt-2 ml-4">
                  <ToggleComponent
                    id={`${id}`}
                    checked={item.status ? item.status : false}
                    onChange={(value) =>
                      publishMutation.mutate({
                        id: item.id?.toString()!,
                        published: value,
                      })
                    }
                  />
                  <p className="font-semibold text-secondary">
                    {item.status ? "Habilitado" : "Deshabilitado"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setConfirmDialog((prev) => ({
                      ...prev,
                      showButtons: true,
                      idTask: item.id!,
                    }));
                    modalConfirm.current?.show();
                  }}
                  className="flex items-center gap-4 cursor-pointer"
                >
                  <p className="font-semibold">¿Eliminar tarea?</p>
                  <MdDeleteForever color={Colors.danger} size={30} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
