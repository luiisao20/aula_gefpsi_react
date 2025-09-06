import { useEffect, useState } from "react";
import { Outlet, useLocation, useMatch, useNavigate } from "react-router";

import "./assets/main.css";
import { Navbar } from "./components/Navbar";
import { useAuthStore } from "./presentation/auth/useAuthStore";
import { LoaderComponent } from "./components/SpinnerComponent";
import { useStudent } from "./presentation/student/useStudent";

const App = () => {
  const matchRoot = useMatch("/");
  const location = useLocation();
  const navigate = useNavigate();

  const publicRoutes = ["/", "/register"];
  const showNavbar = publicRoutes.includes(location.pathname);

  const [admin, setAdmin] = useState<boolean>();

  const { user, status, loading, checkStatus, logout } = useAuthStore();
  const { studentQuery } = useStudent(user?.id);

  useEffect(() => {
    if (studentQuery.data) setAdmin(studentQuery.data.admin);
  }, [studentQuery.data]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (status === "unauthenticated" && !publicRoutes.includes(currentPath)) {
      navigate("/", { replace: true });
    }

    if (location.pathname === "/" && status === "authenticated") {
      navigate("/home");
    }

  }, [status, matchRoot, navigate]);

  if (status === "checking") {
    return <LoaderComponent />;
  }

  return (
    <div>
      {!showNavbar && (
        <Navbar admin={admin} onLogout={logout} loadingLogut={loading} />
      )}
      <Outlet />
    </div>
  );
};

export default App;
