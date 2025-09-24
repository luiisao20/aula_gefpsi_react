import type { Notice } from "../../../interfaces/Notice";
import { supabase } from "../../../../supabase";

export const getAds = async (): Promise<Notice[]> => {
  const notices: Notice[] = [];

  const { data, error } = await supabase
    .from("notices")
    .select()
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  for (const element of data) {
    notices.push({
      date: element.created_at,
      description: element.description,
      title: element.title,
      url: element.url,
      id: element.id,
    });
  }
  return notices;
};

export const insertAd = async (ad: Notice) => {
  const { error } = await supabase.from("notices").insert({
    title: ad.title,
    description: ad.description,
    url: ad.url ?? null,
  });

  if (error) throw new Error(error.message);
};

export const deleteAd = async (id: number) => {
  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) throw new Error(error.message);
};

export const getLastAd = async (userId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from("notices")
    .select("id")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  if (data.length === 0) return 'hello';

  const lastAdId = data[0].id;

  const { data: dataNot, error: errorNot } = await supabase
    .from("user_sees_notices")
    .select("id_notice")
    .eq("id_notice", lastAdId)
    .eq("id_user", userId);

  if (errorNot) throw new Error(errorNot.message);

  if (dataNot.length > 0) return dataNot[0].id_notice;

  return null;
};

export const insertNotification = async (userId: string, noticeId: number) => {
  const { error } = await supabase
    .from("user_sees_notices")
    .insert({ id_user: userId, id_notice: noticeId });

  if (error) throw new Error(error.message);
};
