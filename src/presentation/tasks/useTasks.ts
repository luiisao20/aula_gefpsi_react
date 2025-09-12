import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  disableTaskForStudent,
  enableTaskForStudent,
  getTasksEnabledByUser,
  getTasksEnabledForStudent,
  getTasksForEnable,
} from "../../core/database/tasks/tasks.action";

export const useTasksForEnable = () => {
  const queryTasks = useQuery({
    queryKey: ["tasksForEnable"],
    queryFn: () => getTasksForEnable(),
    staleTime: 1000 * 60 * 60,
  });

  return { queryTasks };
};

export const useEnabledTasksForStudent = (
  idStudent: string,
  idModule: number
) => {
  const queryTasks = useQuery({
    queryKey: ["tasksForStudent", idStudent, idModule],
    queryFn: () => getTasksEnabledForStudent(idStudent, idModule),
    staleTime: 1000 * 60 * 60,
  });

  return { queryTasks };
};

export const useEnabledTasks = (idStudent: string) => {
  const queryClient = useQueryClient();

  const queryTasksEnabled = useQuery({
    queryFn: () => getTasksEnabledByUser(idStudent),
    queryKey: ["tasksEnabled", idStudent],
    staleTime: 1000 * 60 * 60,
  });

  const enableMutation = useMutation({
    mutationFn: ({ idTask, value }: { value: boolean; idTask: number }) =>
      value
        ? enableTaskForStudent(idStudent, idTask)
        : disableTaskForStudent(idStudent, idTask),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasksEnabled", idStudent],
      });
      alert("Habilitado / Deshabilitado trabajo sincrónico");
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  return { enableMutation, queryTasksEnabled };
};
