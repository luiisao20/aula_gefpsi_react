import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUploadedTask,
  uploadTaskFile,
} from "../../core/storage/task-file.action";
import {
  getStudentAssignments,
  gradeTask,
} from "../../core/database/tasks/tasks.action";

export const useUploadedTasks = (idStudent: string, idModule: number) => {
  const queryClient = useQueryClient();

  const queryTasksUploaded = useQuery({
    queryFn: () => getStudentAssignments(idStudent, idModule),
    queryKey: ["uploadedAssignments", idStudent, idModule],
    staleTime: 1000 * 60 * 60,
  });

  const uploadMutation = useMutation({
    mutationFn: ({ file, idTask }: { file: File; idTask: number }) =>
      uploadTaskFile(file, idTask, idStudent),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["uploadedAssignments", idStudent, idModule],
      });
      return true;
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const updateGradeMutation = useMutation({
    mutationFn: ({
      grade,
      feedback,
      idTask,
    }: {
      grade: number;
      feedback?: string;
      idTask: number;
    }) => gradeTask(idTask, idStudent, grade, feedback),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["uploadedAssignments", idStudent, idModule],
      });
      alert("Calificación subida con éxito!");
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const deleteUploadMutation = useMutation({
    mutationFn: ({ path, idTask }: { path: string; idTask: number }) =>
      deleteUploadedTask(idStudent, idTask, path),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["uploadedAssignments", idStudent, idModule],
      });
      return true;
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  return {
    updateGradeMutation,
    queryTasksUploaded,
    uploadMutation,
    deleteUploadMutation,
  };
};
