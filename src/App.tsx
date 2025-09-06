import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate } from "react-router";

import "./assets/main.css";
import { Navbar } from "./components/Navbar";
import { useAuthStore } from "./presentation/auth/useAuthStore";
import { LoaderComponent } from "./components/SpinnerComponent";
import { useStudent } from "./presentation/student/useStudent";

const App = () => {
  const matchRoot = useMatch("/");
  const navigate = useNavigate();

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
    if (status === "unauthenticated") {
      navigate("/", { replace: true });
    } else if (status === "authenticated" && matchRoot) {
      navigate("/home", { replace: true });
    }
  }, [status, matchRoot, navigate]);

  if (status === "checking") {
    return <LoaderComponent />;
  }

  return (
    <div>
      {!matchRoot && <Navbar admin={admin} onLogout={logout} loadingLogut={loading} />}
      <Outlet />
    </div>
  );
};

export default App;
