import axios from "axios";
import type { CategoryHasBooks } from "../../../interfaces/Library";

export const getBooksFromCategory = async (id: string): Promise<CategoryHasBooks> => {
  try {
    const res = await axios.get(`http://localhost:5000/library/${id}`);

    const response: CategoryHasBooks = {
      category: res.data.category,
      books: res.data.books
    }
    return response;
  } catch (error) {
    throw error;
  }
};
