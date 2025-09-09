import { Outlet } from "react-router";

import { IoIosCreate } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineGrade } from "react-icons/md";
import { TiWarningOutline } from "react-icons/ti";

import type { SideRoute } from "../profile";
import { Sidebar } from "../../components/Sidebar";

export const GeneralScreen = () => {
  const routes: SideRoute[] = [
    {
      name: "Conferencias",
      route: "/home/generals/modules",
      icon: <IoIosCreate size={25} />,
    },
    {
      name: "Estudiantes",
      route: "/home/generals/students",
      icon: <PiStudentBold size={25} />,
    },
    {
      name: "Calificaciones",
      route: "/home/generals/grades",
      icon: <MdOutlineGrade size={25} />,
    },
    {
      name: "Avisos",
      route: "/home/generals/ads",
      icon: <TiWarningOutline size={25} />,
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
