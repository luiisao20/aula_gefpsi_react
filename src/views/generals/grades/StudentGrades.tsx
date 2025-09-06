import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { ModuleGrade } from "../../../interfaces/Grades";
import { useStudentGrades } from "../../../presentation/grades/useGrades";
import { useStudent } from "../../../presentation/student/useStudent";
import type { Student } from "../../../interfaces/Students";
import { TableGrades } from "../../../components/TableComponent";
import { ButtonGoBack } from "../../../components/ButtonGoBack";

export const StudentGrades = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataGrades, setDataGrades] = useState<ModuleGrade[]>([]);
  const [dataStudent, setDataStudent] = useState<Student>();

  const { gradesQuery } = useStudentGrades(parseInt(id!));
  const { studentQuery } = useStudent(id!);

  useEffect(() => {
    if (gradesQuery.data) setDataGrades(gradesQuery.data);
  }, [gradesQuery.data]);

  useEffect(() => {
    if (studentQuery.data) setDataStudent(studentQuery.data);
  }, [studentQuery.data]);

  return (
    <div className="relative my-6">
      <ButtonGoBack />
      <div className="flex flex-col space-y-3 mx-10">
        <h2 className="text-xl text-secondary">
          <span className="font-semibold">Estudiante:</span>{" "}
          {dataStudent?.lastName} {dataStudent?.firstName}
        </h2>
        <h2 className="text-xl text-secondary">
          <span className="font-semibold">Correo:</span> {dataStudent?.email}
        </h2>
      </div>
      {dataGrades.length > 0 ? (
        <TableGrades grades={dataGrades} idStudent={dataStudent?.id!} />
      ) : (
        <div className="flex justify-center flex-col space-y-6">
          <h2 className="font-semibold mt-6 text-center text-xl">
            El estudiante no posee calificaciones registradas
          </h2>
          <button
            onClick={() => navigate(`/generals/student/${dataStudent?.id}`)}
            className="bg-secondary place-self-center hover:bg-secondary/60 p-2 rounded-xl text-white font-semibold cursor-pointer"
          >
            Registrar calificaciones
          </button>
        </div>
      )}
    </div>
  );
};
