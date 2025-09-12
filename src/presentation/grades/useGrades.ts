import { useQuery } from "@tanstack/react-query";

import {
  getGradeByExam,
  getGradesByModule,
  getGradesByStudent,
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
}
