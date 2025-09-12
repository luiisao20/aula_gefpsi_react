import dayjs from "dayjs";
import { supabase } from "../../../../supabase";
import type { Exam, ExamType } from "../../../interfaces/Module";

export const createExamByModule = async (idModule: string) => {  
  const { error } = await supabase
    .from("exams")
    .insert({ id_module: idModule });

  if (error) throw error;
};

export const getExamByModule = async (idModule: string): Promise<Exam> => {
  const { data, error } = await supabase
    .from("exams")
    .select()
    .eq("id_module", idModule)
    .gt("due_date", new Date().toISOString());

  if (error) throw error;

  if (data.length === 0) return {};

  const exam: Exam = {
    idModule: data[0].id_module,
    dueDate: data[0].due_date,
    id: data[0].id,
    status: data[0].status,
  };

  return exam;
};

export const getExamByGeneral = async (idModule: string): Promise<Exam> => {
  const { data, error } = await supabase
    .from("exams")
    .select()
    .eq("id_module", idModule);

  if (error) throw error;

  if (data.length === 0) return {};

  const exam: Exam = {
    idModule: data[0].id_module,
    dueDate: dayjs(data[0].due_date),
    id: data[0].id,
    status: data[0].status,
    review: data[0].review
  };

  return exam;
};

export const updateExam = async (exam: Exam) => {
  const { error } = await supabase
    .from("exams")
    .update({ status: exam.status, due_date: exam.dueDate, review: exam.review })
    .eq("id", exam.id);

  if (error) throw error;
};

export const getQuestionTypes = async (): Promise<ExamType[]> => {
  const types: ExamType[] = [];

  const { data, error } = await supabase.from("question_types").select();

  if (error) throw error;

  for (const element of data) {
    types.push({
      id: element.id,
      type: element.type,
    });
  }
  return types;
};
