import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { useBooks } from "../../presentation/library/useBooks";
import type { CategoryHasBooks } from "../../interfaces/Library";
import { TableBooks } from "../../components/TableComponent";
import { ButtonGoBack } from "../../components/ButtonGoBack";

export const CategoryScreen = () => {
  const { category } = useParams();
  const { booksQuery } = useBooks(`${category}`);

  const [data, setData] = useState<CategoryHasBooks>({
    category: "",
    books: [],
  });

  useEffect(() => {
    if (booksQuery.data) setData(booksQuery.data);
  }, [booksQuery.data]);

  return (
    <div className="relative mt-20 mb-5 w-1/2 mx-auto bg-white p-4 rounded-xl">
      <ButtonGoBack />
      <h2 className="font-semibold text-center text-xl">{data.category}</h2>
      <TableBooks books={data.books} />
    </div>
  );
};
