import { useQuery } from "@tanstack/react-query";
import { getStudentsTasks } from "../../core/database/tasks/tasks.action";

export const useUsersTasks = (idModule?: number) => {
  const tasksQuery = useQuery({
    queryFn: () => getStudentsTasks(idModule!),
    queryKey: ["studentTasks", idModule],
    staleTime: 1000 * 60 * 60,
    enabled: !!idModule,
  });

  return { tasksQuery };
};
