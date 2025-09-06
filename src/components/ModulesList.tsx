import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router";
import { Colors } from "../assets/colors";
import type { Module } from "../interfaces/Module";

interface Props {
  modulesList: Module[];
  route: "module" | "generals" | "students";
  generals?: boolean;
}

export const ModulesList = ({
  modulesList,
  route,
  generals = false,
}: Props) => {
  const displayedModules = generals
    ? modulesList
    : modulesList.filter((item) => item.status);

  const getRouteType = (idModule: number) => {
    switch (route) {
      case "module":
        return `/module/${idModule}/info`;
      case "generals":
        return `/generals/module/${idModule}/info`;
      case "students":
        return `module/${idModule}/exam`;
    }
  };

  return (
    <div className="flex flex-col space-y-4 my-4 w-3/4 mx-auto">
      {displayedModules.map((item) => (
        <div key={item.id}>
          <Link
            to={`${getRouteType(item.id!)}`}
            className="shadow rounded-xl cursor-pointer p-2 flex justify-between px-4 items-center
                hover:transition hover:delay-100 hover:scale-115 hover:shadow-secondary"
          >
            Conferencia {item.number}{" "}
            <GoArrowRight size={25} color={Colors.primary} />
          </Link>
        </div>
      ))}
    </div>
  );
};
