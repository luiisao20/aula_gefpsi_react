import { useEffect, useState } from "react";

import { useCategories } from "../../presentation/library/useCategories";
import type { Category } from "../../interfaces/Library";
import { GoArrowRight } from "react-icons/go";
import { Colors } from "../../assets/colors";
import {Link} from "react-router";

export const LibraryIndex = () => {
  const { categoriesQuery } = useCategories();
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  useEffect(() => {
    if (categoriesQuery.data) setCategoriesList(categoriesQuery.data);
  }, [categoriesQuery.data]);

  return (
    <div className="mt-20 mb-5 md:mx-auto bg-white p-4 rounded-xl md:w-1/2 mx-4">
      <h2 className="text-center text-lg font-semibold text-secondary">
        Bienvenido a la biblioteca, ¡Ingresa en alguna categoría para ver los
        libros disponibles!
      </h2>
      <div className="flex flex-col gap-4 w-3/4 mx-auto">
        {categoriesList.map((item) => (
          <Link
            to={`/library/${item.id}`}
            className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center
            hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
            key={item.id}
          >
            {item.name} <GoArrowRight size={25} color={Colors.primary} />
          </Link>
        ))}
      </div>
    </div>
  );
};
