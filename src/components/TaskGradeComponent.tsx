import { MdOutlineGrade } from "react-icons/md";
import { Formik } from "formik";

import { getFormattedDate } from "../actions/get-date-formatted";
import type { Assignment, TaskForEnable } from "../interfaces/Tasks";
import { ToggleComponent } from "./ToggleComponent";
import { CustomErrorMessage } from "./CustomErrorMessage";
import { gradeForm } from "../actions/get-error-forms";

interface Props {
  item: TaskForEnable;
  taskEnabled: boolean;
  assignment?: Assignment;
  loading: boolean;

  onEnable: (idTask: number, value: boolean) => void;
  onUpdateGrade: (form: FormGrade) => void;
}

interface FormGrade {
  grade: number;
  feedback: string;
}

export const TaskGradeComponent = ({
  item,
  taskEnabled,
  assignment,
  loading,

  onUpdateGrade,
  onEnable,
}: Props) => {
  const formGrade: FormGrade = {
    feedback: assignment?.feedback ?? "",
    grade: assignment?.grade ?? 0,
  };
  return (
    <div>
      <div className="shadow shadow-secondary rounded-xl p-3">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col space-y-2">
            <h2 className="font-semibold text-lg">
              Conferencia: {item.moduleNumber}
            </h2>
            <h2 className="text-lg">Trabajo sincrónico: {item.titleTask}</h2>
          </div>
          <ToggleComponent
            id={"student"}
            checked={taskEnabled}
            onChange={(value) => onEnable(item.idTask, value)}
          />
        </div>
        {assignment && (
          <div>
            <h2 className="text-lg font-semibold text-center text-secondary">
              Tarea entregada
            </h2>
            <div className="flex flex-col space-y-2 mb-4">
              <h2 className="text-base">
                <span className="font-semibold">Subido el: </span>
                {getFormattedDate(`${assignment.createdAt}`)}
              </h2>
              <h2 className="text-base">
                <span className="font-semibold">Archivo: </span>
                <a
                  href={assignment.url}
                  target="_blank"
                  className="cursor-pointer hover:underline hover:underline-offset-2"
                >
                  {assignment.fileName}
                </a>
              </h2>
            </div>
            <Formik
              validationSchema={gradeForm}
              initialValues={formGrade}
              onSubmit={(formLike) => onUpdateGrade(formLike)}
            >
              {({
                values,
                errors,
                touched,

                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                <div className="flex flex-col gap-2 px-6">
                  <label
                    htmlFor="grade"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    Escribe la calificación con punto como decimal (7.5 7 10)
                  </label>
                  <input
                    type="number"
                    name="grade"
                    id="grade"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                    placeholder="Calificación de la tarea"
                    value={values.grade}
                    onChange={handleChange("grade")}
                    onBlur={handleBlur("grade")}
                  />
                  <CustomErrorMessage
                    name="grade"
                    errors={errors}
                    touched={touched}
                  />
                  <label
                    htmlFor="feedback"
                    className="block mb-2 text-base font-medium text-gray-900"
                  >
                    Comentarios
                  </label>
                  <textarea
                    id="feedback"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary/60 focus:border-primary/60 mb-2"
                    placeholder="Escribe un comentario para la tarea (opcional)"
                    value={values.feedback}
                    onChange={handleChange("feedback")}
                    onBlur={handleBlur("feedback")}
                  ></textarea>
                  <CustomErrorMessage
                    name="feedback"
                    errors={errors}
                    touched={touched}
                  />
                  <button
                    onClick={() => handleSubmit()}
                    disabled={loading}
                    type="submit"
                    className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center place-self-end ${
                      loading && "cursor-progress"
                    }`}
                  >
                    <MdOutlineGrade className="mr-4" size={20} />
                    Calificar tarea
                  </button>
                </div>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};
