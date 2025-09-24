import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useAverage,
  useExamTaskGrades,
} from "../../../presentation/grades/useGrades";
import type {
  ExamTaskGrades,
  StudentAverage,
} from "../../../interfaces/Grades";

export const StudentRecover = () => {
  const { id, idModule } = useParams();

  const { gradesQuery } = useExamTaskGrades(parseInt(idModule!), id!);
  const { averageMutation, averageQuery } = useAverage(
    parseInt(idModule!),
    id!
  );

  const [examTaskGrades, setExamTaskGrades] = useState<ExamTaskGrades>();
  const [studentAverage, setStudentAverage] = useState<StudentAverage>();
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    if (gradesQuery.data) setExamTaskGrades(gradesQuery.data);
  }, [gradesQuery.data]);

  useEffect(() => {
    if (averageQuery.data) setStudentAverage(averageQuery.data);
  }, [averageQuery.data]);

  useEffect(() => {
    if (examTaskGrades)
      setAverage(
        ((examTaskGrades?.taskGrade ?? 0) + examTaskGrades?.examGrade) / 2
      );
  }, [examTaskGrades]);

  return (
    <div>
      <h2 className="text-secondary text-xl font-semibold text-center">
        Promedio de calificaciones
      </h2>
      {examTaskGrades && (
        <div className="px-4 flex flex-col">
          <h2 className="text-lg">
            <span className="font-semibold">Examen: </span>
            {examTaskGrades?.examGrade}
          </h2>
          <h2 className="text-lg">
            <span className="font-semibold">Tarea: </span>
            {examTaskGrades?.taskGrade ?? "Tarea no calificada"}
          </h2>
          <h2 className="text-lg">
            <span className="font-semibold">Promedio: </span>
            {average}
          </h2>
          <button
            disabled={averageMutation.isPending}
            onClick={() =>
              averageMutation.mutate({
                grade: average,
                update: studentAverage ? true : false,
              })
            }
            className={`bg-secondary cursor-pointer place-self-end text-white font-semibold p-2 rounded-xl hover:bg-secondary/60 ${
              averageMutation.isPending && "cursor-progress"
            }`}
          >
            {studentAverage ? "Actualizar promedio" : "Guardar promedio"}
          </button>
        </div>
      )}
    </div>
  );
};
