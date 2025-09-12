import { supabase } from "../../../../supabase";
import type { Task } from "../../../interfaces/Module";

export const createNewTask = async (task: Task) => {
  const { error } = await supabase.from("tasks").insert({
    title: task.title,
    due_date: task.dueDate,
    instructions: task.instructions,
    id_module: task.idModule,
  });

  if (error) throw error;
};

export const getTasksByModuleForStudent = async (
  idModule: string
): Promise<Task[]> => {
  const tasks: Task[] = [];

  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("id_module", idModule)
    .eq("status", true);

  if (error) throw error;

  for (const element of data) {
    tasks.push({
      id: element.id,
      dueDate: element.due_date,
      idModule: element.id_module,
      instructions: element.instructions,
      publishedDate: element.published_date,
      title: element.title,
      status: element.status,
    });
  }
  return tasks;
};

export const getTasksByModule = async (idModule: string): Promise<Task[]> => {
  const tasks: Task[] = [];

  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("id_module", idModule);

  if (error) throw error;

  for (const element of data) {
    tasks.push({
      id: element.id,
      dueDate: element.due_date,
      idModule: element.id_module,
      instructions: element.instructions,
      publishedDate: element.published_date,
      title: element.title,
      status: element.status,
    });
  }
  return tasks;
};

export const publishTask = async (idTask: string, value: boolean) => {
  const { error } = await supabase
    .from("tasks")
    .update({ status: value })
    .eq("id", idTask);

  if (error) throw error;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;
};
