import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import "./assets/main.css";
import { useAuthStore } from "./presentation/auth/useAuthStore";
import { LoaderComponent } from "./components/SpinnerComponent";
import { supabase } from "../supabase";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, _) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("Por favor escribe tu nueva contraseña");
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword!,
        });
        if (data) alert("Contraseña actualizada con éxito!");
        if (error)
          alert(`Ocurrió un error. Mensaje del error: ${error.message}`);
      }
    });
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      if (location.pathname === "/register") navigate("/register");
      else if (location.pathname === "/recovery") navigate("/recovery");
      else navigate("/");
    }
  }, [status, navigate]);

  return <div>{status === "checking" ? <LoaderComponent /> : <Outlet />}</div>;
};

export default App;
