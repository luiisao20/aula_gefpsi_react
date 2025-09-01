import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createExamByModule,
  getExamByModule,
  getExamTypes,
  updateExam,
} from "../../core/database/modules/exams-by-module.action";
import type { Exam } from "../../interfaces/Module";
import {
  createQuestionByExam,
  createQuestionWithOptionss,
  deleteQuestion,
  getQuestionsWithOptions,
} from "../../core/database/modules/questions-options-by-exam.action";

export const useExam = (idModule: string) => {
  const queryClient = useQueryClient();

  const examQuery = useQuery({
    queryFn: () => getExamByModule(idModule),
    queryKey: ["exam", idModule],
    staleTime: 1000 * 60 * 60,
  });

  const examMutate = useMutation({
    mutationFn: async (exam: Exam) => {
      if (!exam.id) return await createExamByModule(idModule.toString());
      return await updateExam(exam);
    },

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["exam", idModule],
      });
      console.log(res);
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  return { examQuery, examMutate };
};

export const useTypes = () => {
  const typesQuery = useQuery({
    queryFn: () => getExamTypes(),
    queryKey: ["examTypes"],
    staleTime: 1000 * 60 * 60,
  });

  return { typesQuery };
};

export const useQuestions = (idExam?: string) => {
  const queryClient = useQueryClient();

  const questionsQuery = useQuery({
    queryFn: () => getQuestionsWithOptions(idExam!),
    queryKey: ["questions", idExam],
    enabled: !!idExam,
    staleTime: 1000 * 60 * 60,
  });

  const questionMutation = useMutation({
    mutationFn: createQuestionByExam,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });

      console.log(res);
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const questionWithOptionsMutation = useMutation({
    mutationFn: createQuestionWithOptionss,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });

      console.log(res);
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });

      console.log(res);
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  return {
    questionsQuery,
    questionMutation,
    questionWithOptionsMutation,
    deleteQuestionMutation,
  };
};
