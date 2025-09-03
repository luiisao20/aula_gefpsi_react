import api from "../../../../api";
import type { StudentAnswer } from "../../../interfaces/GeneralExam";
import type { ExamData } from "../../../interfaces/Students";

export const getExamData = async (idExam: string): Promise<ExamData[]> => {
  const examsData: ExamData[] = [];
  try {
    const res = await api.get(`/students/exam/${idExam}`);

    for (const element of res.data) {
      const data: ExamData = {
        id: element.idQuestion,
        idType: element.idType,
        options: element.options,
        question: element.question,
      };
      examsData.push(data);
    }
    return examsData;
  } catch (error) {
    throw error;
  }
};

export const getStateExamStudent = async (
  idStudent: string,
  idExam: string,
) => {
  try {
    const res = await api.get(
      `/students/exam/student/answers?idStudent=${idStudent}&idExam=${idExam}`
    );
    return res.data.exists;
  } catch (error) {
    throw error;
  }
};

export const getAnswers = async (
  idStudent: string,
  idExam: string
): Promise<StudentAnswer[]> => {
  const studentAnswers: StudentAnswer[] = [];
  try {
    const res = await api.get(
      `students/exam/student?${idStudent}=1&idExam=${idExam}`
    );

    for (const element of res.data) {
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
  } catch (error) {
    throw error;
  }
};
