import { useEffect, useState } from "react";
import { useModules } from "../../presentation/modules/useModules";
import type { Module } from "../../interfaces/Module";
import { Link } from "react-router";
import { GoArrowRight } from "react-icons/go";
import { Colors } from "../../assets/colors";

export const ModulesStudent = () => {
  const [modulesList, setModulesList] = useState<Module[]>([]);

  const { modulesQuery } = useModules();

  useEffect(() => {
    if (modulesQuery.data) setModulesList(modulesQuery.data);
  }, [modulesQuery.data]);

  return (
    <div className="mt-20 mb-5 md:w-1/2 md:mx-auto bg-white py-2 md:px-4 px-1 rounded-xl mx-1">
      <h1>ModulesStudent</h1>
      <div className="flex flex-col space-y-4 my-4 w-3/4 mx-auto">
        {modulesList.map((item) => (
          <div key={item.id}>
            {!!item.status && (
              <Link
                to={`/module/${item.id}/info`}
                className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center
                hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
              >
                Módulo {item.number}{" "}
                <GoArrowRight size={25} color={Colors.primary} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
