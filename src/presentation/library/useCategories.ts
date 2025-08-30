import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../core/database/library/get-categories.action";

export const useCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60,
  });

  return { categoriesQuery };
};
