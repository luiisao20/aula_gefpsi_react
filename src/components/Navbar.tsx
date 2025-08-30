import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router";

export const Navbar = () => {
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
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary"
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
              <button
                id="mega-menu-full-modules-button"
                data-collapse-toggle="mega-menu-full-modules"
                className="flex cursor-pointer items-center justify-between w-full py-2 px-3 rounded-sm md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Módulos <IoIosArrowDown className="ml-2" />
              </button>
            </li>
            <li>
              <Link
                to="library"
                className="flex cursor-pointer items-center justify-between w-full py-2 px-3 rounded-sm md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Biblioteca
              </Link>
            </li>
            <li>
              <Link
                to="/notices"
                className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-secondary md:p-0 "
              >
                Avisos
              </Link>
            </li>
            <li>
              <Link
              to='/generals'
                className="block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-secondary md:p-0 "
              >
                Generales
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="mega-menu-full-modules"
        className="mt-1 hidden border-gray-200 shadow-xs border-y"
      >
        <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-white sm:grid-cols-2 md:px-6">
          <ul>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Online Stores</div>
                <span className="text-sm text-gray-400">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Marketing CRM</div>
                <span className="text-sm text-gray-500">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Online Stores</div>
                <span className="text-sm text-gray-500 ">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Segmentation</div>
                <span className="text-sm text-gray-500">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
            <li>
              <a href="#" className="block p-3 rounded-lg hover:bg-gray-100">
                <div className="font-semibold">Marketing CRM</div>
                <span className="text-sm text-gray-500">
                  Connect with third-party tools that you're already using.
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
