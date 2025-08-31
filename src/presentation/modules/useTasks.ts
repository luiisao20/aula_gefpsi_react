import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createNewTask,
  deleteTask,
  getTasksByModule,
  publishTask,
} from "../../core/database/modules/tasks-by-module";
import type { Task } from "../../interfaces/Module";

export const useTasks = (idModule: string) => {
  const queryClient = useQueryClient();
  const tasksQuery = useQuery({
    queryKey: ["tasks", idModule],
    queryFn: () => getTasksByModule(idModule),
    staleTime: 1000 * 60 * 60,
  });

  const tasksMutation = useMutation({
    mutationFn: async (data: Task) => createNewTask(data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", idModule],
      });
      console.log(response.message);
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
      console.log("Estado actualizado");
      queryClient.invalidateQueries({ queryKey: ["tasks", idModule] });
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", idModule] });
      console.log(response.message);
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  return { tasksQuery, publishMutation, deleteTaskMutation, tasksMutation };
};
