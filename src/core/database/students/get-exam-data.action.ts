import { supabase } from "../../../../supabase";
import type { StudentAnswer } from "../../../interfaces/GeneralExam";
import type { ExamData } from "../../../interfaces/Students";

export const getExamData = async (idExam: string): Promise<ExamData[]> => {
  const examsData: ExamData[] = [];

  const { data, error } = await supabase
    .from("questions")
    .select(
      `
        id,
        text,
        id_type,
        options (
          id,
          text,
          is_correct
        )
      `
    )
    .eq("id_exam", idExam);

  if (error) throw new Error(error.message);

  for (const element of data) {
    examsData.push({
      id: element.id,
      question: element.text,
      idType: element.id_type,
      options:
        element.options.length > 0
          ? element.options.map((opt: any) => ({
              id: opt.id,
              option: opt.text,
              isCorrect: opt.is_correct,
            }))
          : [],
    });
  }

  return examsData;
};

export const getStateExamStudent = async (
  idStudent: string,
  idExam: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("student_answers")
    .select("id_student")
    .eq("id_student", idStudent)
    .eq("id_exam", idExam);

  if (error) throw error;

  if (data.length > 0) return true;

  return false;
};

export const getAnswers = async (
  idStudent: string,
  idExam: string
): Promise<StudentAnswer[]> => {
  const studentAnswers: StudentAnswer[] = [];

  const { data, error } = await supabase.rpc("get_student_exam_answers", {
    p_id_student: idStudent,
    p_id_exam: idExam,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    studentAnswers.push({
      answer: element.question,
      correct: element.correct,
      correctOption: element.correctOption,
      idQuestion: element.idQuestion,
      optionSelected: element.optionSelected,
      question: element.question,
    });
  }
  return studentAnswers;
};
