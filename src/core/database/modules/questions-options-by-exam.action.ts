import { supabase } from "../../../../supabase";
import type {
  Option,
  Question,
  QuestionWithOptions,
} from "../../../interfaces/Module";

export const createQuestionByExam = async (question: Question) => {
  const { error } = await supabase.from("questions").insert({
    text: question.text,
    id_exam: question.idExam,
    id_type: question.idType,
  });

  if (error) throw error;
};

export const createQuestionWithOptionss = async (
  questionWithOptions: QuestionWithOptions
) => {
  const { idExam, idType, options, text } = questionWithOptions;
  const { data: question, error: qError } = await supabase
    .from("questions")
    .insert({ text: text, id_exam: idExam, id_type: idType })
    .select()
    .single();

  if (qError) throw qError;

  for (const option of options) {
    const { error: oError } = await supabase.from("options").insert({
      text: option.text,
      is_correct: option.isCorrect,
      id_question: question.id,
    });

    if (oError) throw oError;
  }
};

export const getQuestionsWithOptions = async (
  idExam: string
): Promise<QuestionWithOptions[]> => {
  const { data: questions, error: qError } = await supabase
    .from("questions")
    .select()
    .eq("id_exam", idExam);

  if (qError) throw qError;

  if (!questions) return [];

  const questionsWithOptions: QuestionWithOptions[] = [];

  for (const question of questions) {
    const optionsList: Option[] = [];

    if (question.id_type === 1) {
      const { data: options, error: oError } = await supabase
        .from("options")
        .select("*")
        .eq("id_question", question.id);

      if (oError) throw oError;

      if (options) {
        for (const option of options) {
          optionsList.push({
            isCorrect: option.is_correct,
            text: option.text,
            id: option.id,
            idQuestion: option.id_question,
          });
        }
      }
    }

    questionsWithOptions.push({
      id: question.id,
      text: question.text,
      idExam: question.id_exam,
      idType: question.id_type,
      options: optionsList,
    });
  }

  return questionsWithOptions;
};

export const deleteQuestion = async (id: string) => {
  const { error } = await supabase.from("questions").delete().eq("id", id);

  if (error) throw error;
};
