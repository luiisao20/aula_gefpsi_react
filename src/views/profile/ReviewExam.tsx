import { useParams } from "react-router";
import { useAuthStore } from "../../presentation/auth/useAuthStore";
import { useEffect, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useAnswers, useGrade } from "../../presentation/student/useStudent";
import type { StudentAnswer, StudentGrade } from "../../interfaces/Students";
import { ButtonGoBack } from "../../components/ButtonGoBack";

export const ReviewExam = () => {
  const { id } = useParams();

  const { user } = useAuthStore();
  const [examStudentData, setExamStudentData] = useState<StudentAnswer[]>([]);
  const [gradeData, setGradeData] = useState<StudentGrade>();

  const { answersQuery } = useAnswers(user?.id!, id!);
  const { gradeQuery } = useGrade(user?.id!, id!);

  useEffect(() => {
    if (answersQuery.data) setExamStudentData(answersQuery.data);
  }, [answersQuery.data]);

  useEffect(() => {
    if (gradeQuery.data) setGradeData(gradeQuery.data);
  }, [gradeQuery.data]);

  if (gradeQuery.isLoading) {
    return <h2>Cargando</h2>;
  }

  return (
    <div className="relative bg-white p-4 rounded-xl">
      <ButtonGoBack />
      <div className="flex flex-col space-y-3">
        <h2 className="mb-6 text-lg text-secondary text-center">
          <span className="font-semibold">Calificación del examen:</span>{" "}
          {gradeData?.totalGrade.toFixed(2)}
        </h2>
        {examStudentData.map((item, index) => (
          <div
            key={index}
            className="shadow-sm shadow-secondary p-2 rounded-xl"
          >
            <h2 className="font-semibold mb-2 text-primary text-justify flex justify-between items-center mr-10">
              {index + 1}. {item.question}
            </h2>
            <div className="mx-6">
              {item.questionType === 1 ? (
                <div className="relative">
                  <p className="flex gap-2 items-center">
                    {item.correct ? (
                      <FaCheck className="w-6 h-6 text-success" />
                    ) : (
                      <FaXmark className="w-6 h-6 text-danger" />
                    )}
                    {item.optionSelected ?? (
                      <span className="font-semibold underline underline-offset-2 italic">
                        Pregunta sin respuesta
                      </span>
                    )}
                  </p>
                  {!item.correct && (
                    <p className="my-2">
                      <span className="font-semibold">Opción correcta:</span>{" "}
                      {item.correctOption}
                    </p>
                  )}
                  <p className="absolute right-0 bottom-2">
                    <span className="font-semibold">Puntaje:</span> {item.grade}
                  </p>
                </div>
              ) : (
                <p className="whitespace-pre-line">
                  {item.answer ?? (
                    <span className="font-semibold underline underline-offset-2 italic">
                      Pregunta sin respuesta
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
