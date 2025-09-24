import { supabase } from "../../../supabase";

export const uploadTaskFile = async (
  file: File,
  idTask: number,
  idStudent: string
) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

  const { error } = await supabase.storage
    .from("tasks")
    .upload(`task-${idTask}/${uniqueSuffix}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("tasks")
    .getPublicUrl(`task-${idTask}/${uniqueSuffix}`);

  const { error: dbError } = await supabase.from("student_assignments").insert({
    id_student: idStudent,
    id_task: idTask,
    url: urlData.publicUrl,
    file_name: file.name,
    path: uniqueSuffix,
  });

  if (dbError) throw dbError;

  return true;
};

export const deleteUploadedTask = async (
  idStudent: string,
  idTask: number,
  path: string
) => {
  console.log(path);
  
  const { error } = await supabase.storage
    .from("tasks")
    .remove([`task-${idTask}/${path}`]);

  if (error) throw new Error(error.message);

  const { error: dbError } = await supabase
    .from("student_assignments")
    .delete()
    .eq("id_student", idStudent)
    .eq("id_task", idTask)

  if (dbError) throw new Error(dbError.message);
};
