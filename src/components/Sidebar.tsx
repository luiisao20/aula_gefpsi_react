import { NavLink } from "react-router";
import type { SideRoute } from "../views/profile";
import { MdLogout } from "react-icons/md";

interface Props {
  routes: SideRoute[];
  title?: string;
  profile?: boolean;
  loadingLogout?: boolean;

  onLogout?: () => void;
}

export const Sidebar = ({
  routes,
  title,
  profile,
  loadingLogout,

  onLogout,
}: Props) => {
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed md:top-[73px] top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {title && (
            <h2 className="self-center mb-4 text-primary text-xl font-semibold whitespace-nowrap">
              {title}
            </h2>
          )}
          <ul className="space-y-2 font-medium">
            {routes.map((item, index) => (
              <NavLink
                key={index}
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center rounded-xl p-2 shadow hover:transition hover:delay-100 hover:scale-105 ${
                    isActive && "shadow-secondary"
                  }`
                }
              >
                {item.icon}
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {item.name}
                </span>
              </NavLink>
            ))}
            {profile && (
              <button
                disabled={loadingLogout}
                onClick={onLogout}
                className={`flex w-full items-center justify-start rounded-xl p-2 shadow hover:transition hover:delay-100 hover:scale-105 cursor-pointer ${
                  loadingLogout && "cursor-progress"
                }`}
              >
                <MdLogout size={25} />
                <p className="flex-1 ms-3 whitespace-nowrap text-justify">
                  Cerrar sesión
                </p>
              </button>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};
