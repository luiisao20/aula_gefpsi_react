import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getExamAndTaskGrades,
  getGradeByExam,
  getGradesByModule,
  getGradesByStudent,
  getStudentAverage,
  insertAverage,
  updateStudentAverage,
} from "../../core/database/grades/get-grades.action";

export const useModuleGrades = (
  idModule?: number,
  compeleted?: boolean,
  approven?: boolean
) => {
  const useGrades = useQuery({
    queryFn: () => getGradesByModule(idModule!, compeleted, approven),
    queryKey: ["moduleGrades", idModule],
    staleTime: 1000 * 60 * 60,
    enabled: !!idModule,
  });

  return { useGrades };
};

export const useStudentGrades = (idStudent: string) => {
  const gradesQuery = useQuery({
    queryFn: () => getGradesByStudent(idStudent),
    queryKey: ["studentGrades", idStudent],
    staleTime: 1000 * 60 * 60,
    enabled: !!idStudent,
  });

  return { gradesQuery };
};

export const useExamGrade = (idStudent?: string, idExam?: string) => {
  const gradeExamQuery = useQuery({
    queryFn: () => getGradeByExam(idStudent!, idExam!),
    queryKey: ["examGrade", idStudent, idExam],
    staleTime: 1000 * 60 * 60,
    enabled: !!idStudent && !!idExam,
  });

  return { gradeExamQuery };
};

export const useExamTaskGrades = (idModule: number, idStudent: string) => {
  const gradesQuery = useQuery({
    queryFn: () => getExamAndTaskGrades(idStudent, idModule),
    queryKey: ["examTaskGrades", idStudent, idModule],
    staleTime: 1000 * 60 * 60,
  });

  return { gradesQuery };
};

export const useAverage = (idModule: number, idStudent: string) => {
  const queryCLient = useQueryClient();

  const averageQuery = useQuery({
    queryFn: () => getStudentAverage(idStudent, idModule),
    queryKey: ["average", idStudent, idModule],
    staleTime: 1000 * 60 * 60,
  });

  const averageMutation = useMutation({
    mutationFn: ({ grade, update }: { grade: number; update: boolean }) =>
      update
        ? updateStudentAverage(grade, idStudent, idModule)
        : insertAverage(grade, idStudent, idModule),

    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["average", idStudent, idModule],
      });
      alert("¡El promedio se ha actualizado con éxito!");
    },

    onError: (message) => {
      alert(`Ha ocurrido un error: ${message}`);
    },
  });

  return { averageMutation, averageQuery };
};
