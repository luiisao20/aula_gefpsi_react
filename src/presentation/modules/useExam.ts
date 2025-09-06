import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createExamByModule,
  getExamByModule,
  getQuestionTypes,
  updateExam,
} from "../../core/database/modules/exams-by-module.action";

import type { Exam } from "../../interfaces/Module";
import {
  createQuestionByExam,
  createQuestionWithOptionss,
  deleteQuestion,
  getQuestionsWithOptions,
} from "../../core/database/modules/questions-options-by-exam.action";

import {
  getAnswers,
  getStateExamStudent,
} from "../../core/database/students/get-exam-data.action";
import { insertStudentExamData } from "../../core/database/students/insert-student-exam-data.action";

import type { AnswerExam } from "../../views/modules/module/ExamScreen";

export const useExam = (idModule: string) => {
  const queryClient = useQueryClient();

  const examQuery = useQuery({
    queryFn: () => getExamByModule(idModule),
    queryKey: ["exam", idModule],
    staleTime: 1000 * 60 * 60,
  });

  const examMutate = useMutation({
    mutationFn: async (exam: Exam) => {
      if (!exam) return await createExamByModule(idModule.toString());
      return await updateExam(exam);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["exam", idModule],
      });
      alert("Examen publicado!");
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  return { examQuery, examMutate };
};

export const useTypes = () => {
  const typesQuery = useQuery({
    queryFn: () => getQuestionTypes(),
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const questionWithOptionsMutation = useMutation({
    mutationFn: createQuestionWithOptionss,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions", idExam],
      });
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

export const useExamByStudent = (idStudent: string, idExam?: string) => {
  const queryClient = useQueryClient();

  const answersQuery = useQuery({
    queryFn: () => getAnswers(idStudent, idExam!),
    queryKey: ["answers", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
  });

  const examStudentQuery = useQuery({
    queryFn: () => getStateExamStudent(idStudent, idExam!),
    queryKey: ["examState", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam,
  });

  const examStudentMutation = useMutation({
    mutationFn: (data: AnswerExam[]) =>
      insertStudentExamData(idStudent, idExam!, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["examState", idStudent, idExam],
      });
    },

    onError: (error: any) => {
      console.error(error.response?.data?.error || error.message);
    },
  });

  return { answersQuery, examStudentQuery, examStudentMutation };
};
