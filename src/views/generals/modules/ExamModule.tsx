import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuFileSpreadsheet } from "react-icons/lu";

import type {
  Exam,
  ExamType,
  Option,
  Question,
  QuestionWithOptions,
} from "../../../interfaces/Module";
import {
  useExam,
  useQuestions,
  useTypes,
} from "../../../presentation/modules/useExam";
import { CustomDatePicker } from "../../../components/DatePicker";
import { ToggleComponent } from "../../../components/ToggleComponent";
import { QuestionsListComponent } from "../../../components/QuestionsListComponent";
import { GrRadialSelected } from "react-icons/gr";
import { Colors } from "../../../assets/colors";

interface ErrorOption {
  show: boolean;
  message: string;
}

export const ExamModule = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [examData, setExamData] = useState<Exam>();
  const [examTypes, setExamTypes] = useState<ExamType[]>([]);
  const [questionsList, setQuestionsList] = useState<QuestionWithOptions[]>([]);
  const [questionType, setQuestionType] = useState<number>(1);
  const [correct, setCorrect] = useState<boolean>(false);
  const [optionsList, setOptionsList] = useState<Option[]>([]);
  const [errorOpt, setErrorOpt] = useState<ErrorOption>();

  const { examQuery, examMutate } = useExam(id!);
  const { typesQuery } = useTypes();
  const {
    questionsQuery,
    questionMutation,
    questionWithOptionsMutation,
    deleteQuestionMutation,
  } = useQuestions(examData?.id?.toString());

  useEffect(() => {
    if (examQuery.data) setExamData(examQuery.data);
  }, [examQuery.data]);

  useEffect(() => {
    if (typesQuery.data) setExamTypes(typesQuery.data);
  }, [typesQuery.data]);

  useEffect(() => {
    if (questionsQuery.data) setQuestionsList(questionsQuery.data);
  }, [questionsQuery.data]);

  const handleAddOption = () => {
    if (option.trim() === "")
      return setErrorOpt({
        show: true,
        message: "No se puede agregar un valor vacío",
      });

    if (optionsList.some((opt) => opt.text === option))
      return setErrorOpt({ show: true, message: "Ya existe esta opción" });

    setOption("");
    setCorrect(false);
    setOptionsList((prev) => [...prev, { text: option, isCorrect: correct }]);
    setErrorOpt({
      show: false,
      message: "",
    });
  };

  const hanldeAddQuestion = async () => {
    if (question.trim() === "") return;

    if (questionType === 1) {
      if (!optionsList.some((opt) => opt.isCorrect === true))
        return setErrorOpt({
          show: true,
          message: "Debes agregar al menos una opcion correcta",
        });

      if (optionsList.length < 2)
        return setErrorOpt({
          show: true,
          message: "Debes agregar al menos dos opciones",
        });

      const newQuestionWithOptionss: QuestionWithOptions = {
        idExam: examData?.id!,
        idType: questionType,
        text: question,
        options: [...optionsList],
      };

      await questionWithOptionsMutation.mutateAsync(newQuestionWithOptionss);

      setQuestion("");
      setOptionsList([]);
      setErrorOpt({
        show: false,
        message: "",
      });
      return;
    }

    const newQuestion: Question = {
      idExam: examData?.id!,
      idType: questionType,
      text: question,
    };

    await questionMutation.mutateAsync(newQuestion);
    setQuestion("");
  };

  return (
    <div className="mb-10">
      {!examData?.id ? (
        <div className="flex flex-col my-4 md:flex-row justify-between items-center md:px-10">
          <h2 className="text-base">¿Deseas crear el examen para el módulo?</h2>
          <button
            onClick={() => examMutate.mutate(examData!)}
            className="flex items-center bg-secondary text-white rounded-xl p-2 gap-2 cursor-pointer hover:bg-primary/60"
          >
            <LuFileSpreadsheet size={20} />
            <span className="text-base">Crear</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-lg my-4 font-semibold text-center text-secondary">
            Examen
          </h2>
          <div className="flex flex-col pb-4 md:flex-row md:justify-between items-center border-b border-secondary">
            <div className="flex flex-col space-y-2">
              <p className="font-semibold">Habilitado hasta:</p>
              <CustomDatePicker
                selected={examData.dueDate ?? new Date()}
                onChange={(date) =>
                  setExamData({ ...examData, dueDate: date! })
                }
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mt-2 ml-4">
                <ToggleComponent
                  id={`${id}`}
                  checked={examData.status ?? false}
                  onChange={(checked) =>
                    setExamData({ ...examData, status: checked })
                  }
                />
                <p className="font-semibold text-secondary">
                  {examData.status ? "Habilitado" : "Deshabilitado"}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                examMutate.mutate({
                  ...examData,
                  dueDate: examData.dueDate ?? new Date(),
                })
              }
              className="p-2 cursor-pointer bg-secondary hover:bg-secondary/60 text-white rounded-xl"
            >
              Actualizar información
            </button>
          </div>
          <div className="mt-2">
            <h2 className="text-secondary font-semibold text-xl text-center">
              Ingresar las preguntas del examen
            </h2>
            <h2 className="font-semibold">
              Pasos para ingresar las preguntas:
            </h2>
            <ol className="list-decimal list-inside mx-4 my-2 space-y-2 text-justify">
              <li>
                Escoja una opción, ya sea de{" "}
                <span className="font-semibold">opción múltiple</span> o{" "}
                <span className="font-semibold">llenado</span>.
              </li>
              <li>
                Escriba la pregunta en el cuadro de texto y presione el{" "}
                <span className="font-semibold">botón de agregar</span>.
              </li>
              <li>
                Si la pregunta es de opción mútiple, ingrese las opciones
                necesarias,{" "}
                <span className="font-semibold">
                  mínimo 2 por cada pregunta
                </span>{" "}
                y además selecciona si la opción correcta mediante el{" "}
                <span className="font-semibold">cuadro de confirmación</span>{" "}
                (una opción por cada pregunta).
              </li>
              <li>
                Si necesita eliminar, ya sea una pregunta o una opción, sólo da
                clic encima de cada una de ellas.
              </li>
              <li>
                Las preguntas se van{" "}
                <span className="font-semibold">
                  guardando / eliminando automáticamente
                </span>
                , ten paciencia si por cada una toma algo de tiempo al
                agregarlas.
              </li>
            </ol>
            <QuestionsListComponent
              isDeleting={deleteQuestionMutation.isPending}
              questions={questionsList}
              onDelete={(id) => deleteQuestionMutation.mutate(id)}
            />
            <h2 className="font-semibold text-secondary text-center my-4 text-lg">
              Agregar preguntas
            </h2>
            <div>
              <select
                onChange={(e) => setQuestionType(parseInt(e.target.value))}
                id="types"
                className="bg-gray-50 border border-gray-300 w-1/3 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block p-2.5"
              >
                {examTypes.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mx-4 mt-4 flex flex-col">
              <div className="relative w-full mb-2 z-0 group">
                <input
                  type="text"
                  name="floating_question"
                  id="floating_question"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                  placeholder=" "
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <label
                  htmlFor="floating_question"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ingresa una pregunta
                </label>
              </div>
              {questionType === 1 && (
                <>
                  <ul className="list-inside mx-4 space-y-4 mb-4">
                    {optionsList.map((opt) => (
                      <div
                        onClick={() =>
                          setOptionsList((prev) =>
                            prev.filter((optL) => optL.text !== opt.text)
                          )
                        }
                        key={opt.id}
                        className="flex gap-4 text-justify"
                      >
                        <GrRadialSelected
                          color={opt.isCorrect ? Colors.secondary : "black"}
                        />
                        <li>{opt.text}</li>
                      </div>
                    ))}
                  </ul>
                  <div className="mx-8 flex gap-2 items-center">
                    <div className="relative w-2/3 z-0 group">
                      <input
                        type="text"
                        name="floating_option"
                        id="floating_option"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-secondary peer"
                        placeholder=" "
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                      />
                      <label
                        htmlFor="floating_option"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Ingresa una opción
                      </label>
                      {errorOpt?.show && (
                        <p className="text-xs text-danger">
                          {errorOpt.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={correct}
                        onChange={(e) => setCorrect(e.target.checked)}
                        id="red-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded-sm focus:ring-secondary/60 focus:ring-2"
                      />
                      <label
                        htmlFor="red-checkbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        ¿Opción correcta?
                      </label>
                    </div>
                    <IoMdAddCircleOutline
                      className="cursor-pointer text-secondary hover:text-secondary/60"
                      onClick={handleAddOption}
                      size={30}
                    />
                  </div>
                </>
              )}
              <button
                onClick={hanldeAddQuestion}
                disabled={
                  questionMutation.isPending ||
                  questionWithOptionsMutation.isPending
                }
                className="cursor-pointer"
              >
                <IoMdAddCircleOutline
                  className="place-self-center mt-2 text-secondary transition-all duration-300 hover:rotate-90"
                  size={30}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
