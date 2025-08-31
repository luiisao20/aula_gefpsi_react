import type { CategoryHasBooks } from "../../../interfaces/Library";
import api from "../../../../api";

export const getBooksFromCategory = async (id: string): Promise<CategoryHasBooks> => {
  try {
    const res = await api.get(`/library/${id}`);

    const response: CategoryHasBooks = {
      category: res.data.category,
      books: res.data.books
    }
    return response;
  } catch (error) {
    throw error;
  }
};
