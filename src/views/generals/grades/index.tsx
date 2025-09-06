import { Outlet } from "react-router";
import { BreadCumbComponentGrades } from "../../../components/BreadCumbComponent";

export const GradesIndex = () => {
  return (
    <div>
      <h2 className="text-2xl mb-2 font-bold text-center text-secondary">
        Vista de calificaciones
      </h2>
      <h2 className="text-xl font-semibold mb-5">
        Escoje una opción para revisar las calificaciones por conferencias o
        estudiantes
      </h2>
      <BreadCumbComponentGrades />
      <Outlet />
    </div>
  );
};
