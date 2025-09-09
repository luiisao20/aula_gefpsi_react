import { supabase } from "../../../../supabase";
import type { AnswerExam } from "../../../views/modules/module/ExamScreen";

export const insertStudentExamData = async (
  idStudent: string,
  idModule: string,
  idExam: string,
  data: AnswerExam[]
) => {
  console.log(idModule);

  const totalGrade: number =
    (data.reduce(
      (total: number, current) =>
        current.grade ? total + current.grade : total,
      0
    ) *
      10) /
    data.length;

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

  const { error: exError } = await supabase.from("exam_results").insert({
    id_student: idStudent,
    id_exam: idExam,
    total_grade: totalGrade,
    id_module: idModule,
  });

  if (error) throw new Error(exError?.message);
};
