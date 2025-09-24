import { supabase } from "../../../../supabase";
import type { Task } from "../../../interfaces/Module";
import type {
  Assignment,
  TaskEnabled,
} from "../../../interfaces/Tasks";

export const gradeTask = async (
  idTask: number,
  idStudent: string,
  grade: number,
  feedback?: string
) => {
  const { data } = await supabase
    .from("student_assignments")
    .select("*")
    .eq("id_student", idStudent)
    .eq("id_task", idTask);

  console.log(data);
  const { error } = await supabase
    .from("student_assignments")
    .update({
      grade: grade,
      feedback: feedback ?? null,
      graded_at: new Date().toISOString(),
    })
    .eq("id_student", idStudent)
    .eq("id_task", idTask);

  if (error) throw new Error(error.message);

  return true;
};

export const getStudentAssignments = async (
  idStudent: string,
  idModule: number
): Promise<Assignment[]> => {
  const studentAssignments: Assignment[] = [];
  const { data, error } = await supabase.rpc("get_students_assignments", {
    user_id: idStudent,
    module_id: idModule,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    studentAssignments.push({
      fileName: element.file_name,
      url: element.url,
      path: element.path,
      idTask: element.id_task,
      createdAt: element.created_at,
      feedback: element.feedback ?? undefined,
      grade: element.grade ?? undefined,
      gradedAt: element.graded_at ?? undefined,
    });
  }
  return studentAssignments;
};

export const getTasksEnabledForStudent = async (
  idStudent: string,
  idModule: number
): Promise<Task[]> => {
  const tasks: Task[] = [];
  const { data, error } = await supabase.rpc("get_students_tasks_enabled", {
    user_id: idStudent,
    module_id: idModule,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    tasks.push({
      dueDate: element.due_date,
      title: element.title,
      instructions: element.instructions,
      publishedDate: element.published_date,
      id: element.id_task,
    });
  }

  return tasks;
};

export const getTasksEnabledByUser = async (
  idStudent: string
): Promise<TaskEnabled[]> => {
  const studentsEnabled: TaskEnabled[] = [];
  const { data, error } = await supabase
    .from("enabled_tasks")
    .select()
    .eq("id_student", idStudent);

  if (error) throw new Error(error.message);

  for (const element of data) {
    studentsEnabled.push({
      idStudent: element.id_student,
      idTask: element.id_task,
    });
  }

  return studentsEnabled;
};

export const getUsersEnabledForModule = async (
  idModule: number
): Promise<string[]> => {
  const students: string[] = [];

  const { data, error } = await supabase.rpc("get_students_enabled_by_module", {
    module_id: idModule,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    students.push(element.id_student);
  }

  return students;
};

export const enableTaskForStudent = async (
  idStudent: string,
  idTask?: number
): Promise<boolean> => {
  if (!idTask)
    throw new Error(
      "Debes crear al menos una tarea sincrónica para esta conferencia"
    );

  const { error } = await supabase
    .from("enabled_tasks")
    .insert({ id_student: idStudent, id_task: idTask });

  if (error) throw new Error(error.message);

  return true;
};

export const disableTaskForStudent = async (
  idStudent: string,
  idTask: number
): Promise<boolean> => {
  const { error } = await supabase
    .from("enabled_tasks")
    .delete()
    .eq("id_student", idStudent)
    .eq("id_task", idTask);

  if (error) throw new Error(error.message);

  return true;
};
