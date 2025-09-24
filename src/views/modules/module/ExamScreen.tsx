import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import type { ExamData, Option } from "../../../interfaces/Students";
import { useQuestionsExam } from "../../../presentation/student/useExam";
import { ModalReact, type ModalReactProps } from "../../../components/ModalReact";
import {
  useExam,
  useExamByStudent,
} from "../../../presentation/modules/useExam";
import { useAuthStore } from "../../../presentation/auth/useAuthStore";
import { LoaderComponent } from "../../../components/SpinnerComponent";
import { useExamGrade } from "../../../presentation/grades/useGrades";
import type { Exam } from "../../../interfaces/Module";

export interface AnswerExam {
  idQuestion: number;
  idOption?: number;
  idType: number;
  text?: string;
  grade?: number;
}

export const ExamScreen = () => {
  const { id, idEval } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [examDataList, setExamDataList] = useState<ExamData[]>([]);
  const [answersExam, setAnswersExam] = useState<AnswerExam[]>([]);
  const [modalProps, setModalProps] = useState<ModalReactProps>({
    message: "",
    open: false,
  });
  const [resultData, setResultData] = useState<number>(0);
  const [examData, setExamData] = useState<Exam>();

  const { examQuery } = useExam(`${id}`);
  const { examStudentMutation } = useExamByStudent(user?.id!, idEval);
  const { questionsStudentQuery } = useQuestionsExam(`${idEval}`);
  const { gradeExamQuery } = useExamGrade(user?.id, idEval);

  useEffect(() => {
    if (questionsStudentQuery.data) setExamDataList(questionsStudentQuery.data);
  }, [questionsStudentQuery.data]);

  useEffect(() => {
    if (gradeExamQuery.data) setResultData(gradeExamQuery.data);
  }, [gradeExamQuery.data]);

  useEffect(() => {
    if (examQuery.data) setExamData(examQuery.data);
  }, [examQuery.data]);

  useEffect(() => {
    if (questionsStudentQuery.data) {
      const initialAnswers = questionsStudentQuery.data.map((item) => ({
        idQuestion: item.id,
        idType: item.idType,
      }));
      setAnswersExam(initialAnswers);
    }
  }, [questionsStudentQuery.data]);

  const handleSelectOption = (idQuestion: number, option: Option) => {
    setAnswersExam((prev) =>
      prev.map((a) =>
        a.idQuestion === idQuestion
          ? { ...a, idOption: option.id, grade: option.isCorrect ? 1 : 0 }
          : a
      )
    );
  };

  const handleWriteAnswer = (idQuestion: number, text: string) => {
    setAnswersExam((prev) =>
      prev.map((a) => (a.idQuestion === idQuestion ? { ...a, text: text } : a))
    );
  };

  const handleShowModal = async () => {
    const notAnswered = answersExam
      .filter(
        (answer) =>
          (!answer.idOption && !answer.text) || answer.text?.trim() === ""
      )
      .map((answer) => {
        const questionNumber = examDataList.findIndex(
          (q) => q.id === answer.idQuestion
        );
        return questionNumber !== -1 ? questionNumber + 1 : null;
      })
      .filter((num) => num !== null);

    if (notAnswered.length > 0) {
      setModalProps((prev) => ({
        ...prev!,
        open: true,
        warning: true,
        showButtons: true,
        message: `
          Existen preguntas sin responder
          ${notAnswered.join("; ")}
          ¿Estás seguro de enviar los datos?
          Esta acción no se puede deshacer
        `,
      }));
      return;
    }

    setModalProps((prev) => ({
      ...prev!,
      open: true,
      warning: false,
      showButtons: true,
      message: `
        ¿Estás seguro de enviar los datos?
        Esta acción no se puede deshacer  
      `,
    }));
  };

  const handleSendData = async () => {
    await examStudentMutation.mutateAsync({
      data: answersExam,
      idModule: `${id}`,
    });
    alert("Examen publicado");
    navigate(-1);
  };

  if (gradeExamQuery.isLoading || questionsStudentQuery.isLoading)
    return <LoaderComponent />;

  if (resultData === 1 || !examData?.status)
    return <h1 className="text-primary font-bold text-center">Forbidden</h1>;

  return (
    <div>
      <ModalReact
        message={modalProps.message}
        onConfirm={handleSendData}
        showButtons={modalProps.showButtons}
        warning={modalProps.warning}
        open={modalProps.open}
        loading={examStudentMutation.isPending}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
      />
      <h2 className="text-xl font-semibold text-center text-secondary">
        Contesta las siguientes preguntas
      </h2>
      <p className="font-semibold text-base my-4">
        Sólo hay una opción correcta en las preguntas de opción múltiple.
      </p>
      {examDataList.map((item, index) => (
        <div key={index} className="px-6">
          {item.idType === 1 ? (
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-primary">
                {examDataList.findIndex((e) => e.id === item.id) + 1}.{" "}
                {item.question}
              </h2>
              {item.options.map((opt, subIndex) => (
                <div
                  key={index + subIndex}
                  className="flex items-center mb-4 px-4"
                >
                  <input
                    id={`question-${item.id}-option-${opt.id}`}
                    type="radio"
                    checked={
                      answersExam.some((e) => e.idOption === opt.id) ?? false
                    }
                    onChange={() => handleSelectOption(item.id, opt)}
                    name={`question-${index}`}
                    value="USA"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary/30"
                  />
                  <label
                    htmlFor={`question-${item.id}-option-${opt.id}`}
                    className="block ms-2  text-sm font-medium"
                  >
                    {opt.option}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <label
                htmlFor={`answer-${item.id}`}
                className="font-semibold text-primary"
              >
                {examDataList.findIndex((e) => e.question === item.question) +
                  1}
                . {item.question}
              </label>
              <div className="mx-4">
                <textarea
                  value={
                    answersExam.find((a) => a.idQuestion === item.id)?.text ??
                    ""
                  }
                  onChange={(e) => handleWriteAnswer(item.id, e.target.value)}
                  id={`answer-${item.id}`}
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary/60 focus:border-primary/60"
                  placeholder="Respuesta..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col items-end justify-end">
        <button
          onClick={handleShowModal}
          className="px-4 py-2 bg-secondary hover:bg-secondary/60 cursor-pointer text-white font-semibold rounded-xl"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
