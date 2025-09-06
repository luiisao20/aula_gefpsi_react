import { supabase } from "../../../../supabase";

interface Props {
  options: 1 | 2 | 3 | 4 | 5;
  id: string;
}

export const deleteInfoFromModule = async ({ options, id }: Props) => {
  const route = () =>
    options === 1
      ? "objectives"
      : options === 2
      ? "contents"
      : options === 3
      ? "bibliographies"
      : options === 4
      ? "video_conferences"
      : "extra_content";

  const { error } = await supabase.from(route()).delete().eq("id", id);

  if (error) throw new Error(error.message);
};
