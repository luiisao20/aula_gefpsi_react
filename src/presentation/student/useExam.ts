import { useQuery } from "@tanstack/react-query";
import { getExamData } from "../../core/database/students/get-exam-data.action";

export const useQuestionsExam = (idExam: string) => {
  const questionsStudentQuery = useQuery({
    queryFn: () => getExamData(idExam),
    queryKey: ["studentExam", idExam],
    staleTime: 1000 * 60 * 60,
  });

  return { questionsStudentQuery };
};
