import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllStudents,
  getExamByStudent,
  getGradeByStudent,
  getStudent,
  updateGradeQuestionsByStudent,
} from "../../core/database/students/students.action";
import type { GradesByQuestion } from "../../views/generals/students/StudentExam";

export const useStudents = () => {
  const studentsQuery = useQuery({
    queryFn: () => getAllStudents(),
    queryKey: ["students"],
    staleTime: 1000 * 60 * 60,
  });

  return { studentsQuery };
};

export const useStudent = (idStudent: string) => {
  const studentQuery = useQuery({
    queryFn: () => getStudent(idStudent),
    queryKey: ["student", idStudent],
    staleTime: 1000 * 60 * 60,
  });

  return { studentQuery };
};

export const useAnswers = (idStudent: string, idExam: string) => {
  const queryClient = useQueryClient();

  const answersQuery = useQuery({
    queryFn: () => getExamByStudent(idStudent, idExam),
    queryKey: ["answers", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam && !!idStudent,
  });

  const answersMutation = useMutation({
    mutationFn: async ({
      grades,
      totalGrade,
      update
    }: {
      grades: GradesByQuestion[];
      totalGrade: number;
      update?: boolean
    }) =>
      await updateGradeQuestionsByStudent(
        idStudent,
        idExam,
        grades,
        totalGrade,
        update ?? false
      ),

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["answers", idStudent, idExam],
      });
      queryClient.invalidateQueries({
        queryKey: ["grade", idStudent, idExam],
      });
      alert(res.message);
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return { answersQuery, answersMutation };
};

export const useGrade = (idStudent: string, idExam: string) => {
  const gradeQuery = useQuery({
    queryFn: () => getGradeByStudent(idStudent, idExam),
    queryKey: ["grade", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idExam && !!idStudent,
    retry: false,
  });

  return { gradeQuery };
};
