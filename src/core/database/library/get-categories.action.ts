import type { Category } from "../../../interfaces/Library";
import api from "../../../../api";

export const getCategories = async (): Promise<Category[]> => {
  const catgories: Category[] = [];

  try {
    const res = await api.get("/library/categories");

    for (const element of res.data) {
      const notice: Category = {
        id: element.id,
        name: element.name,
      };
      catgories.push(notice);
    }
    return catgories;
  } catch (error) {
    throw error;
  }
};
