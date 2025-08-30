import { useQuery } from "@tanstack/react-query";
import { getBooksFromCategory } from "../../core/database/library/get-books-from-category.action";

export const useBooks = (idCategory: string) => {
  const booksQuery = useQuery({
    queryKey: ["books", idCategory],
    queryFn: () => getBooksFromCategory(idCategory),
    staleTime: 1000 * 60 * 60,
  });

  return { booksQuery };
};
