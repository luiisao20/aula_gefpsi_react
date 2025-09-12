import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { FaHome } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { HiPencilSquare } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";

import { Sidebar } from "../../../components/Sidebar";
import type { SideRoute } from "../../profile";
import type { Module } from "../../../interfaces/Module";
import { useModule } from "../../../presentation/modules/useModules";

export const ModuleStudent = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState<Module>();
  const { moduleQuery } = useModule(`${id}`);

  const routes: SideRoute[] = [
    {
      name: "Inicio",
      route: `info`,
      icon: <FaHome size={25} />,
    },
    {
      name: "Bibliografía",
      route: `bibliography`,
      icon: <ImBooks size={25} />,
    },
    {
      name: "Trabajos sincrónicos",
      route: `task`,
      icon: <BiTask size={25} />,
    },
    {
      name: "Evaluación",
      route: `eval`,
      icon: <HiPencilSquare size={25} />,
    },
  ];

  useEffect(() => {
    if (moduleQuery.data) setModuleData(moduleQuery.data);
  }, [moduleQuery.data]);

  return (
    <div className="relative">
      <Sidebar routes={routes} title={`Conferencia ${moduleData?.number}`} />
      <div className="mt-20 mb-5 md:w-1/2 md:mx-auto bg-white py-2 md:px-4 px-1 rounded-xl mx-1">
        <Outlet />
      </div>
    </div>
  );
};
