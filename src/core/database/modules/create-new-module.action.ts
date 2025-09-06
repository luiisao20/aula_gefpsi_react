import type { Module } from "../../../interfaces/Module";
import { supabase } from "../../../../supabase";

export const createNewModule = async (module: Module) => {
  const { data, error } = await supabase
    .from("modules")
    .insert({
      title: module.title,
      professor: module.professor,
      module_number: module.number,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data.module_number as number;
};

export const publishModule = async (id: string, value: boolean) => {
  const { error } = await supabase
    .from("modules")
    .update({ status: value })
    .eq("id", id);

  if (error) throw new Error(error.message);
};
