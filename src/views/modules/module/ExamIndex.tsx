import { useEffect, useState } from "react";
import type { Exam } from "../../../interfaces/Module";
import {
  useExam,
  useExamByStudent,
} from "../../../presentation/modules/useExam";
import { useNavigate, useParams } from "react-router";
import { getFormattedDate } from "../../../actions/get-date-formatted";
import { useAuthStore } from "../../../presentation/auth/useAuthStore";
import {LoaderComponent} from "../../../components/SpinnerComponent";

export const ExamIndex = () => {
  const { id } = useParams();
  const idModule = `${id}`;
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const [examData, setExamData] = useState<Exam>();
  const [examState, setExamState] = useState<boolean>();

  const { examQuery } = useExam(idModule);
  const { examStudentQuery } = useExamByStudent(
    user?.id!,
    examData?.id?.toString()
  );

  useEffect(() => {
    if (examStudentQuery.data) setExamState(examStudentQuery.data);
  }, [examStudentQuery.data]);

  useEffect(() => {
    if (examQuery.data) setExamData(examQuery.data);
  }, [examQuery.data]);

  if (examQuery.isLoading || examStudentQuery.isLoading) {
    return <LoaderComponent />
  }

  return (
    <div className="flex flex-col pt-5 pb-10">
      <h2 className="text-xl font-semibold text-center text-secondary">
        Bienvenido al examen de la conferencia
      </h2>
      <h2 className="text-lg font-semibold text-secondary">Instrucciones:</h2>
      <p className="whitespace-pre-line text-base text-justify mx-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nemo sint
        necessitatibus unde aut iste, earum totam distinctio cupiditate est?
        Architecto nulla, ratione animi itaque deserunt exercitationem natus
        debitis hic.
      </p>
      <h2 className="text-base my-4">
        <span className="font-semibold">Examen disponible hasta: </span>
        {getFormattedDate(`${examData?.dueDate}`) ?? "No disponible."}
      </h2>
      <h2 className="text-base my-4">
        <span className="font-semibold">Estado: </span>
        {examData?.status ? "Habilitado" : "No habilitado"}
      </h2>
      {examState ? (
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
