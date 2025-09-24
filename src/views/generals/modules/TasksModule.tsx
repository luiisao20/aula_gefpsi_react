import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaBook } from "react-icons/fa6";

import type { Task } from "../../../interfaces/Module";
import { useTasks } from "../../../presentation/modules/useTasks";
import { TaskComponent } from "../../../components/TaskComponent";
import {
  ModalReact,
  ModalRTask,
  type ModalReactProps,
} from "../../../components/ModalReact";

interface ModalProps extends ModalReactProps {
  idTask: number;
}

export const TasksModule = () => {
  const { id } = useParams();

  const { tasksQuery, publishMutation, deleteTaskMutation, tasksMutation } =
    useTasks(`${id}`);

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [modalProps, setModalProps] = useState<ModalProps>({
    message: "¿Estás seguro de eliminar la tarea?",
    open: false,
    idTask: 0,
  });

  const [modalTaskProps, setModalTaskProps] = useState<ModalReactProps>({
    open: false,
  });

  useEffect(() => {
    if (tasksQuery.data) setTasksList(tasksQuery.data);
  }, [tasksQuery.data]);

  const handleSendData = async () => {
    await deleteTaskMutation.mutateAsync(modalProps.idTask.toString());
    setModalProps((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="my-4">
      <ModalReact
        message={modalProps.message}
        onConfirm={handleSendData}
        showButtons={modalProps.showButtons}
        warning={modalProps.warning}
        open={modalProps.open}
        loading={deleteTaskMutation.isPending}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
      />
      <ModalRTask
        open={modalTaskProps.open}
        onClose={() => setModalTaskProps((prev) => ({ ...prev, open: false }))}
        onSendData={async (data) => {
          await tasksMutation.mutateAsync(data as Task);
          setModalTaskProps((prev) => ({ ...prev, open: false }));
        }}
        moduleId={`${id}`}
        loading={tasksMutation.isPending}
      />
      <div className="flex flex-col md:flex-row justify-between items-center md:px-10">
        <h2 className="text-base">¿Deseas crear una nueva tarea?</h2>
        <button
          onClick={() => setModalTaskProps((prev) => ({ ...prev, open: true }))}
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
              setModalProps((prev) => ({
                ...prev!,
                open: true,
                warning: true,
                showButtons: true,
                idTask: id,
              }));
            }}
          />
        ))}
      </div>
    </div>
  );
};
