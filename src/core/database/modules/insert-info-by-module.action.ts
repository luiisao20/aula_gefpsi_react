import api from "../../../../api";
import { supabase } from "../../../../supabase";
import type { ExtraContent } from "../../../interfaces/Module";

export const insertObjectivesByModule = async (
  idModule: string,
  objectives: string[]
) => {
  try {
    const result = await api.post("/modules/objectives", {
      idModule,
      objectives,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertExtraContentByModule = async (
  idModule: string,
  extraContent: ExtraContent[]
) => {
  const rpcItems = extraContent.map((item) => ({
    url: item.url,
    description: item.description,
  }));

  const { error } = await supabase.rpc("insert_extra_contents", {
    module_id: idModule,
    items: rpcItems,
  });

  if (error) throw new Error(error.message);
};

export const insertContentsByModule = async (
  idModule: string,
  topic: string
) => {
  const { error } = await supabase
    .from("contents")
    .insert({ topic: topic, id_module: idModule });

  if (error) throw new Error(error.message);
};

export const insertBibliographyByModule = async (
  idModule: string,
  bibliography: string[]
) => {
  const rpcItems = bibliography.map((ref) => ({ reference: ref }));

  const { error } = await supabase.rpc("insert_bibliog", {
    module_id: idModule,
    items: rpcItems,
  });

  if (error) throw new Error(error.message);
};

export const insertVideoConferenceByModule = async (
  idModule: number,
  url: string
) => {
  const { error } = await supabase
    .from("video_conferences")
    .insert({ url: url, id_module: idModule });

  if (error) throw new Error(error.message);
};
