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
import { TaskComponent } from "../../../components/TaskComponent";

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
        onAccept={async () => {
          await deleteTaskMutation.mutateAsync(confirmDialog.idTask.toString());
          setConfirmDialog((prev) => ({
            ...prev,
            message: "Registro eliminado exitosamente",
            showButtons: false,
          }));
        }}
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
          <TaskComponent
            key={index}
            item={item}
            onPublish={(id, value) =>
              publishMutation.mutate({ id, published: value })
            }
            onDelete={(id) => {
              setConfirmDialog((prev) => ({
                ...prev,
                showButtons: true,
                idTask: id,
              }));
              modalConfirm.current?.show();
            }}
          />
        ))}
      </div>
    </div>
  );
};
