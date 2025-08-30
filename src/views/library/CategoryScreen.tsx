import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IoArrowBackOutline } from "react-icons/io5";

import { useBooks } from "../../presentation/library/useBooks";
import type { CategoryHasBooks } from "../../interfaces/Library";
import { TableBooks } from "../../components/TableComponent";
import { Colors } from "../../assets/colors";

export const CategoryScreen = () => {
  const { category } = useParams();
  const { booksQuery } = useBooks(`${category}`);
  const navigate = useNavigate();

  const [data, setData] = useState<CategoryHasBooks>({
    category: "",
    books: [],
  });

  useEffect(() => {
    if (booksQuery.data) setData(booksQuery.data);
  }, [booksQuery.data]);

  return (
    <div className="relative mt-20 mb-5 w-1/2 mx-auto bg-white p-4 rounded-xl">
      <button
        className="absolute cursor-pointer hover:transition hover:delay-150 hover:scale-115"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline size={30} color={Colors.secondary} />
      </button>
      <h2 className="font-semibold text-center text-xl">{data.category}</h2>
      <TableBooks books={data.books} />
    </div>
  );
};
