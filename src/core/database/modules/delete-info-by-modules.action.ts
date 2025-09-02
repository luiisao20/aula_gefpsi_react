import api from "../../../../api";

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
      ? "bibliography"
      : options === 4
      ? "video_conference"
      : "extra_content";

  try {
    const res = await api.delete(`/modules/${route()}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
