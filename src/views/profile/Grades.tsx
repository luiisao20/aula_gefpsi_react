import { useEffect, useState } from "react";
import { useAuthStore } from "../../presentation/auth/useAuthStore";
import { useStudentGrades } from "../../presentation/grades/useGrades";
import type { ModuleGrade } from "../../interfaces/Grades";
import { TableGrades } from "../../components/TableComponent";
import { LoaderComponent } from "../../components/SpinnerComponent";

export const GradesScreen = () => {
  const { user } = useAuthStore();

  const { gradesQuery } = useStudentGrades(user?.id!);
  const [dataGrades, setDataGrades] = useState<ModuleGrade[]>([]);

  useEffect(() => {
    if (gradesQuery.data) setDataGrades(gradesQuery.data);
  }, [gradesQuery.data]);

  if (gradesQuery.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="p-4 rounded-xl bg-white">
      <h2 className="text-center font-bold text-2xl text-secondary">
        Calificaciones
      </h2>
      {dataGrades.length > 0 ? (
        <TableGrades grades={dataGrades} />
      ) : (
        <div className="flex justify-center flex-col space-y-6">
          <h2 className="font-semibold mt-6 text-center text-xl">
            Tus calificaciones aún no se encuentran disponibles
          </h2>
        </div>
      )}
    </div>
  );
};
