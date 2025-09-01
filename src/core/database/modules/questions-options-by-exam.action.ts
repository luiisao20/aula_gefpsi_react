import api from "../../../../api";
import type {
  Option,
  Question,
  QuestionWithOptions,
} from "../../../interfaces/Module";

export const createQuestionByExam = async (question: Question) => {
  try {
    const res = await api.post("/exams/question", question);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createQuestionWithOptionss = async (
  questionWithOptions: QuestionWithOptions
) => {
  try {
    const res = await api.post("/exams/question/options", questionWithOptions);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestionsWithOptions = async (
  idExam: string
): Promise<QuestionWithOptions[]> => {
  const questionsWithOptions: QuestionWithOptions[] = [];
  try {
    const res = await api.get(`/exams/questions/${idExam}`);

    for (const element of res.data) {
      const options: Option[] = [];

      if (element.options.length > 0) {
        for (const option of element.options) {
          const newOption: Option = {
            idQuestion: option.id_question,
            isCorrect: option.is_correct,
            text: option.text,
            id: option.id,
          };
          options.push(newOption);
        }
      }

      const newQuestionWithOptions: QuestionWithOptions = {
        id: element.id,
        text: element.text,
        idType: element.id_type,
        idExam: element.id_exam,
        options: options,
      };
      questionsWithOptions.push(newQuestionWithOptions);
    }

    return questionsWithOptions || [];
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    const res = await api.delete(`/exams/questions/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
