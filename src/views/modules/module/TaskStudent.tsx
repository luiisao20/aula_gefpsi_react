import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Task } from "../../../interfaces/Module";
import { TaskComponent } from "../../../components/TaskComponent";
import { useEnabledTasksForStudent } from "../../../presentation/tasks/useTasks";
import { useAuthStore } from "../../../presentation/auth/useAuthStore";
import { useUploadedTasks } from "../../../presentation/tasks/useUploadedTasks";
import type { Assignment } from "../../../interfaces/Tasks";

export const TaskStudent = () => {
  const { id } = useParams();

  const { user } = useAuthStore();

  const { queryTasks } = useEnabledTasksForStudent(user?.id!, parseInt(id!));
  const { queryTasksUploaded, uploadMutation, deleteUploadMutation } =
    useUploadedTasks(user?.id!, parseInt(id!));

  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [dataAssignments, setDataAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (queryTasks.data) setTasksList(queryTasks.data);
  }, [queryTasks.data]);

  useEffect(() => {
    if (queryTasksUploaded.data) setDataAssignments(queryTasksUploaded.data);
  }, [queryTasksUploaded.data]);

  const handleUploadTask = async (file: File, idTask: number) => {
    await uploadMutation.mutateAsync({
      file: file,
      idTask: idTask,
    });
  };

  return (
    <div>
      <h2 className="text-xl text-secondary font-semibold text-center mt-3 mb-6">
        Trabajos sincrónicos de la conferencia
      </h2>
      <div className="flex flex-col space-y-3">
        {tasksList.map((item, index) => (
          <TaskComponent
            key={index}
            item={item}
            student
            assignment={dataAssignments.find((a) => a.idTask === item.id)}
            uploadLoading={uploadMutation.isPending}
            deleteLoading={deleteUploadMutation.isPending}
            onUploadTask={(file) => handleUploadTask(file, item.id!)}
            onDeleteAssignment={(idTask, path) =>
              deleteUploadMutation.mutate({ idTask, path })
            }
          />
        ))}
      </div>
    </div>
  );
};
