import api from "../../../../api";
import type { Task } from "../../../interfaces/Module";

export const createNewTask = async (task: Task) => {
  try {
    const res = await api.post("/tasks", task);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getTasksByModule = async (idModule: string): Promise<Task[]> => {
  const tasks: Task[] = [];
  try {
    const res = await api.get(`/tasks/${idModule}`);

    for (const element of res.data) {
      const task: Task = {
        id: element.id,
        dueDate: element.due_date,
        idModule: element.id_module,
        instructions: element.instructions,
        publishedDate: element.published_date,
        title: element.title,
        status: element.status,
      };
      tasks.push(task);
    }
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const publishTask = async (idTask: string, value: boolean) => {
  try {
    const result = await api.put(`/tasks/${idTask}/publish`, { value });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const result = await api.delete(`/tasks/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};
