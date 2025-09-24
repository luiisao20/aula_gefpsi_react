import { useEffect } from "react";
import { Link } from "react-router";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

import { initFlowbite } from "flowbite";
import { useNotifications } from "../presentation/ads/useAds";
import { useAuthStore } from "../presentation/auth/useAuthStore";

interface Props {
  loadingLogut: boolean;
  admin?: boolean;

  onLogout: () => void;
}

export const Navbar = ({ admin, loadingLogut, onLogout }: Props) => {
  const { user } = useAuthStore();
  const { queryNotification } = useNotifications(user?.id);

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <nav className="bg-primary fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl text-white flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo-gefpsi.png" className="h-10" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            GEFPSI
          </span>
        </div>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            id="profile-menu-dropdown-button"
            data-dropdown-toggle="profile-dropdown-menu"
            className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm hover:text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <IoPerson size={25} />
            <MdKeyboardArrowDown size={25} />
          </button>
          <div
            className="z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow-sm"
            id="profile-dropdown-menu"
          >
            <ul className="py-2 font-medium" role="none">
              <Link
                to="profile/main"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 cursor-pointer"
              >
                <div className="inline-flex items-center">Perfil</div>
              </Link>
              <li>
                <Link
                  to="profile/password"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <div className="inline-flex items-center">Contraseña</div>
                </Link>
              </li>
              <li>
                <Link
                  to="profile/payments"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
                  role="menuitem"
                >
                  <div className="inline-flex items-center">Pagos</div>
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    if (!loadingLogut) onLogout();
                  }}
                  className={`block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-secondary ${
                    loadingLogut && "cursor-progress"
                  }`}
                  role="menuitem"
                >
                  <div className="inline-flex items-center">Cerrar sesión</div>
                </a>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-language"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to="/home"
                className="flex cursor-pointer items-center justify-between w-full py-2 px-3 rounded-sm md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="modules"
                className="flex cursor-pointer items-center justify-between w-full py-2 px-3 rounded-sm md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Módulos
              </Link>
            </li>
            {/* <li>
              <Link
                to="library"
                className="flex cursor-pointer items-center justify-between w-full py-2 px-3 rounded-sm md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Biblioteca
              </Link>
            </li> */}
            <li className={queryNotification.data ? '' : 'bg-red-100 text-red-800 font-medium rounded-sm border border-red-400'}>
              <Link
                to="notices"
                className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-secondary md:p-0 "
              >
                {queryNotification.data ? "Avisos" : "Nuevos avisos"}
              </Link>
            </li>
            {admin && (
              <li>
                <Link
                  to="generals/modules"
                  className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-secondary md:p-0 "
                >
                  Generales
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
