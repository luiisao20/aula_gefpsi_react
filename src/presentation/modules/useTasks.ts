import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewTask,
  deleteTask,
  getTasksByModule,
  getTasksByModuleForStudent,
  publishTask,
} from "../../core/database/modules/tasks-by-module";
import type { Task } from "../../interfaces/Module";

export const useStudentTasks = (idModule: string) => {
  const tasksQuery = useQuery({
    queryKey: ["studentTasks", idModule],
    queryFn: () => getTasksByModuleForStudent(idModule),
    staleTime: 1000 * 60 * 60,
  });

  return { tasksQuery };
};

export const useTasks = (idModule: string) => {
  const queryClient = useQueryClient();
  const tasksQuery = useQuery({
    queryKey: ["tasks", idModule],
    queryFn: () => getTasksByModule(idModule),
    staleTime: 1000 * 60 * 60,
  });

  const tasksMutation = useMutation({
    mutationFn: async (data: Task) => createNewTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", idModule],
      });
    },

    onError: (error: any) => {
      const message = error.response?.data?.error || "Error desconocido";
      console.log(message);
    },
  });

  const publishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) =>
      publishTask(id, published),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", idModule] });
      alert("Estado actualizado");
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", idModule] });
    },

    onError: (error: any) => {
      alert(error.response?.data?.error || error.message);
    },
  });

  return { tasksQuery, publishMutation, deleteTaskMutation, tasksMutation };
};
