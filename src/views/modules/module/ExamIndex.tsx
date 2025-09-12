import { useEffect, useState } from "react";
import type { Exam } from "../../../interfaces/Module";
import { useExam } from "../../../presentation/modules/useExam";
import { useNavigate, useParams } from "react-router";
import { getFormattedDate } from "../../../actions/get-date-formatted";
import { useAuthStore } from "../../../presentation/auth/useAuthStore";
import { LoaderComponent } from "../../../components/SpinnerComponent";
import { useExamGrade } from "../../../presentation/grades/useGrades";

export const ExamIndex = () => {
  const { id } = useParams();
  const idModule = `${id}`;
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const [examData, setExamData] = useState<Exam>();
  const [examState, setExamState] = useState<number>();

  const { examQuery } = useExam(idModule);
  const { gradeExamQuery } = useExamGrade(user?.id, examData?.id?.toString());

  useEffect(() => {
    if (gradeExamQuery.data) setExamState(gradeExamQuery.data);
  }, [gradeExamQuery.data]);

  useEffect(() => {
    if (examQuery.data) setExamData(examQuery.data);
  }, [examQuery.data]);

  if (examQuery.isLoading || gradeExamQuery.isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col pt-5 pb-10">
      <h2 className="text-xl font-semibold text-center text-secondary">
        Bienvenido al examen de la conferencia
      </h2>
      <h2 className="text-lg font-semibold text-secondary">Instrucciones:</h2>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        La evaluación está disponible hasta la fecha señalada.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Existe una opción correcta por cada pregunta.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Revisa bien antes de enviar el examen, ya que sólo existe un intento.
      </p>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Si recargas la página antes de enviar los datos, tu progreso se
        eliminará y debes volver a empezar desde cero.
      </p>
      <h2 className="text-base my-4">
        <span className="font-semibold">Examen disponible hasta: </span>
        {getFormattedDate(`${examData?.dueDate}`) ?? "No disponible."}
      </h2>
      <h2 className="text-base my-4">
        <span className="font-semibold">Estado: </span>
        {examData?.status ? "Habilitado" : "No habilitado"}
      </h2>
      {examState === 1 ? (
        <h2 className="text-center text-secondary font-semibold">
          Evaluación completada, no se admiten más intentos
        </h2>
      ) : (
        <button
          onClick={() => navigate(`${examData?.id}`)}
          disabled={!examData?.status}
          className={`text-lg place-self-center font-semibold bg-gray-300 text-white px-4 py-2 rounded-xl ${
            examData?.status &&
            "bg-secondary hover:bg-secondary/60 cursor-pointer"
          }`}
        >
          Iniciar evaluación
        </button>
      )}
    </div>
  );
};
