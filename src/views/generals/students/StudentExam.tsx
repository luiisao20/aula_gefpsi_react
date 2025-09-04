import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";

import type { StudentAnswer, StudentGrade } from "../../../interfaces/Students";
import { useAnswers, useGrade } from "../../../presentation/student/useStudent";
import { useExam } from "../../../presentation/modules/useExam";
import type { Exam } from "../../../interfaces/Module";
import type { ModalReactProps } from "../../modules/module/ExamScreen";
import { ModalReact } from "../../../components/ModalReact";
import { buildGradesSchema } from "../../../actions/get-error-forms";

export interface GradesByQuestion {
  idQuestion: number;
  grade: string;
}

export const StudentExam = () => {
  const { id, idModule } = useParams();
  const [dataAnswers, setDataAnswers] = useState<StudentAnswer[]>([]);
  const [examData, setExamData] = useState<Exam>();
  const [gradesByQuestion, setGradesByQuestion] = useState<GradesByQuestion[]>(
    []
  );
  const [modalProps, setModalProps] = useState<ModalReactProps>({
    message: "",
    open: false,
  });
  const [initialValues, setInitialValues] = useState<{
    grades: Record<number, string>;
  }>({ grades: {} });
  const [newDataAnswers, setNewDataAnswers] = useState<{
    grades: GradesByQuestion[];
    totalGrade: number;
  }>();
  const [gradeData, setGradeData] = useState<StudentGrade | null>();

  const { examQuery } = useExam(idModule!);
  const { answersQuery, answersMutation } = useAnswers(
    id!,
    examData?.id?.toString()!
  );
  const { gradeQuery } = useGrade(id!, examData?.id?.toString()!);

  useEffect(() => {
    if (examQuery.data) setExamData(examQuery.data);
  }, [examQuery.data]);

  useEffect(() => {
    if (gradeQuery.data) setGradeData(gradeQuery.data);
  }, [gradeQuery.data]);

  useEffect(() => {
    if (answersQuery.data) setDataAnswers(answersQuery.data);
  }, [answersQuery.data]);

  useEffect(() => {
    if (dataAnswers) {
      setInitialValues({
        grades: dataAnswers.reduce((acc, item) => {
          acc[item.idQuestion] =
            item.questionType === 1 ? (item.correct ? "1" : "0") : "";
          return acc;
        }, {} as Record<number, string>),
      });
    }
  }, [dataAnswers]);

  useEffect(() => {
    if (answersQuery.data) {
      const initialGrades: GradesByQuestion[] = answersQuery.data.map(
        (item) => ({
          idQuestion: item.idQuestion,
          grade: item.questionType === 1 ? (item.correct ? "1" : "0") : "",
        })
      );
      setGradesByQuestion(initialGrades);
    }
  }, [answersQuery.data]);

  const getGradeByQuestion = (idQuestion: number): string =>
    gradesByQuestion.find((g) => g.idQuestion === idQuestion)?.grade!;

  const handleShowModal = async (
    gradesArray: GradesByQuestion[],
    setSubmitting: (value: boolean) => void
  ) => {
    const totalGrade =
      (gradesArray.reduce(
        (total: number, current) => total + parseInt(current.grade),
        0
      ) *
        10) /
      gradesByQuestion.length;

    setNewDataAnswers({
      grades: gradesArray,
      totalGrade: totalGrade,
    });

    if (gradeData) {
      setSubmitting(false);
      setModalProps((prev) => ({
        ...prev!,
        warning: false,
        showButtons: true,
        message: `¿Deseas actualizar la calificación del examen?
          Nota final ${totalGrade.toFixed(2)}`,
        open: true,
      }));
      return;
    }

    setModalProps((prev) => ({
      ...prev!,
      open: true,
      warning: false,
      message: ` ¿Estás seguro de guardar las calificaciones?
        Nota final ${totalGrade.toFixed(2)}
      `,
      showButtons: true,
    }));
    setSubmitting(false);
  };

  return (
    <div>
      <ModalReact
        message={modalProps.message}
        onConfirm={async () => {
          await answersMutation.mutateAsync({
            grades: newDataAnswers?.grades!,
            totalGrade: newDataAnswers?.totalGrade!,
            update: gradeData ? true : false,
          });
          setModalProps((prev) => ({ ...prev!, open: false }));
          return;
        }}
        showButtons={modalProps.showButtons}
        warning={modalProps.warning}
        open={modalProps.open}
        loading={answersMutation.isPending}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
      />
      <div className="mb-10">
        <h2 className="font-bold text-center text-xl mb-6">
          Respuestas del estudiante
        </h2>
        {gradeQuery.error?.message === "Request failed with status code 404" ? (
          <h2 className="font-semibold mb-6 text-secondary text-lg">
            Examen no calificado
          </h2>
        ) : (
          <h2 className="mb-6 text-lg text-secondary">
            <span className="font-semibold">Calificación del examen:</span>{" "}
            {gradeData?.totalGrade.toFixed(2)}
          </h2>
        )}
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={buildGradesSchema(dataAnswers!)}
          onSubmit={(values, { setSubmitting }) => {
            const gradesArray: GradesByQuestion[] = Object.entries(
              values.grades
            ).map(([idQuestion, grade]) => ({
              idQuestion: Number(idQuestion),
              grade: String(grade),
            }));
            handleShowModal(gradesArray, () => setSubmitting(false));
          }}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <div className="flex flex-col space-y-4">
                {dataAnswers.map((item, index) => (
                  <div
                    key={index}
                    className="shadow-sm shadow-secondary p-2 rounded-xl"
                  >
                    <h2 className="font-semibold mb-2 text-primary text-justify flex justify-between items-center mr-10">
                      {index + 1}. {item.question}
                    </h2>
                    <div className="mx-6">
                      {item.questionType === 1 ? (
                        <div>
                          <p className="flex gap-2 items-center">
                            {item.correct ? (
                              <FaCheck className="w-6 h-6 text-success" />
                            ) : (
                              <FaXmark className="w-6 h-6 text-danger" />
                            )}
                            {item.answer ?? (
                              <span className="font-semibold underline underline-offset-2 italic">
                                Pregunta sin respuesta
                              </span>
                            )}
                          </p>
                          {!item.correct && (
                            <p className="my-2">
                              <span className="font-semibold">
                                Opción correcta:
                              </span>{" "}
                              {item.correctOption}
                            </p>
                          )}
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
                      <div className="flex items-end justify-end gap-4">
                        <h2
                          onClick={() =>
                            console.log(getGradeByQuestion(item.idQuestion))
                          }
                          className="font-semibold pb-2"
                        >
                          Calificación:
                        </h2>
                        <Field
                          as="input"
                          type="text"
                          name={`grades.${item.idQuestion}`}
                          id={`input-group-${index}`}
                          disabled={item.questionType === 1}
                          className="rounded-xl w-1/5 border-secondary"
                          placeholder="Sobre 1"
                          value={values.grades[item.idQuestion] ?? ""}
                        />
                        {errors.grades?.[item.idQuestion] &&
                          touched.grades?.[item.idQuestion] && (
                            <div className="text-red-500 text-sm">
                              {errors.grades[item.idQuestion]}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`place-self-end py-2 px-4 rounded-xl text-white font-semibold cursor-pointer ${"bg-secondary hover:bg-secondary/60"}`}
                >
                  Guardar calificación
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
