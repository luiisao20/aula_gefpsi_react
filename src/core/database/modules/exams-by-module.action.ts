import api from "../../../../api";
import type { Exam, ExamType } from "../../../interfaces/Module";

export const createExamByModule = async (idModule: string) => {
  try {
    const res = await api.post("/exams", { idModule });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getExamByModule = async (idModule: string): Promise<Exam> => {
  try {
    const res = await api.get(`/exams/${idModule}`);
    const exam: Exam = {
      idModule: res.data.id_module,
      dueDate: res.data.due_date,
      id: res.data.id,
      status: res.data.status,
    };
    return exam;
  } catch (error) {
    throw error;
  }
};

export const updateExam = async (exam: Exam) => {
  try {
    const res = await api.put(`/exams/${exam.id}`, exam);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getExamTypes = async (): Promise<ExamType[]> => {
  const types: ExamType[] = [];
  try {
    const res = await api.get("/exams/types");
    for (const element of res.data) {
      const newType: ExamType = {
        id: element.id,
        type: element.type,
      };
      types.push(newType);
    }
    return types;
  } catch (error) {
    throw error;
  }
};
