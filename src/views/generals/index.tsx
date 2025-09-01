import { IoIosCreate } from "react-icons/io";
import type { SideRoute } from "../profile";
import { Sidebar } from "../../components/Sidebar";
import {Outlet} from "react-router";

export const GeneralScreen = () => {
  const routes: SideRoute[] = [
    {
      name: "Módulos",
      route: "/generals/modules",
      icon: <IoIosCreate size={25} />,
    },
  ];
  return (
    <>
      <Sidebar routes={routes} />
      <div className="mt-20 mb-5 md:w-1/2 md:mx-auto bg-white py-2 md:px-4 px-1 rounded-xl mx-1">
        <Outlet />
      </div>
    </>
  );
};
