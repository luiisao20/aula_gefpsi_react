import type { Module } from "../../../interfaces/Module";
import { supabase } from "../../../../supabase";

export const getModules = async (): Promise<Module[]> => {
  const { data, error } = await supabase.from("modules").select();

  if (error) throw new Error(error.message);

  const modules: Module[] = [];

  for (const element of data) {
    modules.push({
      id: element.id,
      number: element.module_number,
      title: element.title,
      professor: element.professor,
      status: element.status
    });
  }
  return modules;
};
