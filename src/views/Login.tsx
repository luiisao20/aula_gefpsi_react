import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { InputPassword } from "../components/InputPassword";
import { useAuthStore } from "../presentation/auth/useAuthStore";
import { supabase } from "../../supabase";
import { ModalReact, type ModalReactProps } from "../components/ModalReact";

const Login = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [modalProps, setModalProps] = useState<ModalReactProps>({
    open: false,
  });

  const { loading, login, status } = useAuthStore();

  useEffect(() => {
    if (status === "authenticated") navigate("/home");
  }, []);

  const handleSubmit = async () => {
    const wasSuccessfull = await login(formLogin.email, formLogin.password);

    if (typeof wasSuccessfull !== "string") {
      return navigate("/home");
    }

    setModalProps((prev) => ({
      ...prev,
      open: true,
      message: `¡Ingreso incorrecto! Correo electrónico o contraseña son inválidos. 
      Codigo de error: ${wasSuccessfull}`,
    }));
  };

  const handelRetrievePassword = async () => {
    if (formLogin.email.trim() === "") {
      setModalProps((prev) => ({
        ...prev,
        open: true,
        message: "Ingresa un correo electrónico",
      }));
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      formLogin.email
    );

    if (error) {
      setModalProps((prev) => ({
        ...prev,
        open: true,
        message: `Ocurrió un error! ${error.message}`,
      }));
      return;
    }
    setModalProps((prev) => ({
      ...prev,
      open: true,
      message: "Revisa tu correo electrónico y restaura tu contraseña",
    }));
  };

  return (
    <div>
      <section>
        <ModalReact
          open={modalProps.open}
          message={modalProps.message}
          onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
        />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Ingresa con tu cuenta
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tu correo electrónico
                  </label>
                  <input
                    value={formLogin.email}
                    onChange={(e) =>
                      setFormLogin((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contraseña
                  </label>
                  <InputPassword
                    password={formLogin.password}
                    changeText={(text) =>
                      setFormLogin((prev) => ({ ...prev, password: text }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    onClick={handelRetrievePassword}
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/register"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Regístrate con tu nueva cuenta
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full text-white bg-primary cursor-pointer hover:bg-primary/70 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 ${
                    loading && "cursor-progress"
                  }`}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
