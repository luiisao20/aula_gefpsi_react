import { useQuery } from "@tanstack/react-query";

import {
  getGradesByModule,
  getGradesByStudent,
} from "../../core/database/grades/get-grades.action";

export const useModuleGrades = (idModule?: number) => {
  const useGrades = useQuery({
    queryFn: () => getGradesByModule(idModule!),
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
    enabled: !!idStudent
  });

  return { gradesQuery };
};
