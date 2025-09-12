import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  useEnabledTasks,
  useTasksForEnable,
} from "../../../presentation/tasks/useTasks";
import type {
  Assignment,
  TaskEnabled,
  TaskForEnable,
} from "../../../interfaces/Tasks";
import { useUploadedTasks } from "../../../presentation/tasks/useUploadedTasks";
import { TaskGradeComponent } from "../../../components/TaskGradeComponent";

export const StudentTasks = () => {
  const { id, idModule } = useParams();

  const [dataTasks, setDataTasks] = useState<TaskForEnable[]>([]);
  const [dataTasksEnabled, setDataTasksEnabled] = useState<TaskEnabled[]>([]);
  const [dataAssignments, setDataAssignments] = useState<Assignment[]>([]);

  const { queryTasks } = useTasksForEnable();
  const { queryTasksEnabled, enableMutation } = useEnabledTasks(id!);
  const { queryTasksUploaded, updateGradeMutation } = useUploadedTasks(
    id!,
    parseInt(idModule!)
  );

  useEffect(() => {
    if (queryTasks.data) setDataTasks(queryTasks.data);
  }, [queryTasks.data]);

  useEffect(() => {
    if (queryTasksEnabled.data) setDataTasksEnabled(queryTasksEnabled.data);
  }, [queryTasksEnabled.data]);

  useEffect(() => {
    if (queryTasksUploaded.data) setDataAssignments(queryTasksUploaded.data);
  }, [queryTasksUploaded.data]);

  const handleEnableTask = (idTask: number, value: boolean) => {
    enableMutation.mutate({ value, idTask });
  };

  const assignment = (idTask: number): Assignment | undefined =>
    dataAssignments.find((a) => a.idTask === idTask);

  return (
    <div className="mb-10">
      <div className="flex flex-col space-y-3">
        {dataTasks.map((item, index) => (
          <TaskGradeComponent
            item={item}
            loading={updateGradeMutation.isPending}
            key={index}
            onEnable={handleEnableTask}
            taskEnabled={dataTasksEnabled.some((t) => t.idTask === item.idTask)}
            assignment={assignment(item.idTask)}
            onUpdateGrade={({ feedback, grade }) =>
              updateGradeMutation.mutate({
                idTask: item.idTask,
                feedback,
                grade,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
