import { Outlet } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { BsPersonFillGear } from "react-icons/bs";
import type { ReactElement } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosCard } from "react-icons/io";
import { MdLogout } from "react-icons/md";

export interface SideRoute {
  name: string;
  route: string;
  icon: ReactElement;
}

export const ProfileIndex = () => {
  const routes: SideRoute[] = [
    {
      name: "Perfil",
      route: "/profile/main",
      icon: <BsPersonFillGear size={25} />,
    },
    {
      name: "Contraseña",
      route: "/profile/password",
      icon: <RiLockPasswordFill size={25} />,
    },
    {
      name: "Pagos",
      route: "/profile/payments",
      icon: <IoIosCard size={25} />,
    },
    {
      name: "Cerrar sesión",
      route: "/",
      icon: <MdLogout size={25} />,
    },
  ];
  return (
    <div className="my-20">
      <Sidebar routes={routes} />
      <div className="md:w-1/2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
