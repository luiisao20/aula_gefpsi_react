import api from "../../../../api";
import type { AnswerExam } from "../../../views/modules/module/ExamScreen";

export const insertStudentExamData = async (
  idStudent: string,
  idExam: string,
  data: AnswerExam[]
) => {
  try {
    const res = await api.post(
      `students/exam/student/${idStudent}/exam/${idExam}`,
      data
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
