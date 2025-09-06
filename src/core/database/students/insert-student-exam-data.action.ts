import { supabase } from "../../../../supabase";
import type { AnswerExam } from "../../../views/modules/module/ExamScreen";

export const insertStudentExamData = async (
  idStudent: string,
  idExam: string,
  data: AnswerExam[]
) => {
  const answersNormalized = data.map((item) => ({
    id_student: idStudent,
    id_question: item.idQuestion,
    written_answer: item.text ?? null,
    id_selected_option: item.idOption ?? null,
    id_exam: idExam,
    id_question_type: item.idType,
  }));

  const { error } = await supabase
    .from("student_answers")
    .insert(answersNormalized);

  if (error) throw new Error(error.message);

  console.log(answersNormalized);
};
