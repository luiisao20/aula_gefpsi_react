import axios from "axios";
import type { Category } from "../../../interfaces/Library";

export const getCategories = async (): Promise<Category[]> => {
  const catgories: Category[] = [];

  try {
    const res = await axios.get("http://localhost:5000/library/categories");

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
