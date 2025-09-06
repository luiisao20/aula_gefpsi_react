import { useQuery } from "@tanstack/react-query";

import {
  getGradesByModule,
  getGradesByStudent,
} from "../../core/database/grades/get-grades.action";
import type {Student} from "../../interfaces/Students";

export const useModuleGrades = (students: Student[], idModule?: number) => {
  const useGrades = useQuery({
    queryFn: () => getGradesByModule(idModule!, students),
    queryKey: ["moduleGrades", idModule],
    staleTime: 1000 * 60 * 60,
    enabled: !!idModule && !!students,
  });

  return { useGrades };
};

export const useStudentGrades = (idStudent: string) => {
  const gradesQuery = useQuery({
    queryFn: () => getGradesByStudent(idStudent),
    queryKey: ["studentGrades", idStudent],
    staleTime: 1000 * 60 * 60,
  });

  return { gradesQuery };
};
