import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  disableTaskForStudent,
  enableTaskForStudent,
  getUsersEnabledForModule,
} from "../../core/database/tasks/tasks.action";

export const useEnabledUsers = (idModule?: number) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryFn: () => getUsersEnabledForModule(idModule!),
    queryKey: ["usersEnabled", idModule],
    staleTime: 1000 * 60 * 60,
    enabled: !!idModule,
  });

  const enableMutation = useMutation({
    mutationFn: ({
      idStudent,
      value,
      idTask,
    }: {
      idStudent: string;
      value: boolean;
      idTask?: number;
    }) =>
      value
        ? enableTaskForStudent(idStudent, idTask)
        : disableTaskForStudent(idStudent, idTask!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usersEnabled", idModule],
      });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  return { usersQuery, enableMutation };
};
