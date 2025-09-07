import { supabase } from "../../../supabase";
import type { ConferenceFile } from "../../interfaces/Module";

export const uploadConferenceFile = async (file: File, idModule: string) => {
  const { error } = await supabase.storage
    .from("conferences")
    .upload(`files/conference-${idModule}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

    console.log(error);
    

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("conferences")
    .getPublicUrl(`files/conference-${idModule}`);

  const { error: dbError } = await supabase.from("conference_files").insert({
    url: urlData.publicUrl,
    file_name: file.name,
    id_module: idModule,
  });
  if (dbError) throw dbError;
};

export const getConferenceFile = async (
  idModule: string
): Promise<ConferenceFile> => {
  const { data, error } = await supabase
    .from("conference_files")
    .select()
    .eq("id_module", idModule)

  if (error) throw new Error(error.message);

  const newFile: ConferenceFile = {
    fileName: data[0].file_name,
    url: data[0].url,
    id: data[0].id,
  };

  return newFile;
};

export const deleteConferenceFile = async (idModule: string) => {
  const { error } = await supabase.storage
    .from("conferences")
    .remove([`files/conference-${idModule}`]);

  if (error) throw new Error(error.message);

  const { error: dbError } = await supabase
    .from("conference_files")
    .delete()
    .eq("id_module", idModule);

  if (dbError) throw new Error(dbError.message);
};
