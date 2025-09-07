import type { Notice } from "../../../interfaces/Notice";
import { supabase } from "../../../../supabase";

export const getAds = async (): Promise<Notice[]> => {
  const notices: Notice[] = [];

  const { data, error } = await supabase.from("ads").select();

  if (error) throw new Error(error.message);

  for (const element of data) {
    notices.push({
      date: element.created_at,
      description: element.description,
      title: element.title,
      url: element.url,
    });
  }
  return notices;
};
