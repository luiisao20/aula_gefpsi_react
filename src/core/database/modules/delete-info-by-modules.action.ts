import api from "../../../../api";

interface Props {
  options: 1 | 2 | 3;
  id: string;
}

export const deleteInfoFromModule = async ({ options, id }: Props) => {
  const route = () =>
    options === 1 ? "objectives" : options === 2 ? "contents" : "bibliography";

  try {
    const res = await api.delete(`/modules/${route()}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
