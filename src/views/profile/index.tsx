import { Outlet } from "react-router";
import { Sidebar } from "../../components/Sidebar";
import { BsPersonFillGear } from "react-icons/bs";
import type { ReactElement } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineGrade } from "react-icons/md";
import { useAuthStore } from "../../presentation/auth/useAuthStore";

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
      name: "Calificaciones",
      route: "/profile/grades",
      icon: <MdOutlineGrade size={25} />,
    },
  ];

  const { loading, logout } = useAuthStore();

  return (
    <div className="my-20">
      <Sidebar
        loadingLogout={loading}
        onLogout={logout}
        profile
        routes={routes}
      />
      <div className="md:w-1/2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};
