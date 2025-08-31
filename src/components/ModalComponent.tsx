import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  initFlowbite,
  Modal,
  type InstanceOptions,
  type ModalInterface,
  type ModalOptions,
} from "flowbite";
import { Formik } from "formik";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";

import { Colors } from "../assets/colors";
import type { Module, Task } from "../interfaces/Module";
import { CustomErrorMessage } from "./CustomErrorMessage";
import { moduleForm, taskForm } from "../actions/get-error-forms";
import { useModules } from "../presentation/modules/useModules";
import { MessageForm } from "./MessageForm";
import { CustomDatePicker } from "./DatePicker";
import { useTasks } from "../presentation/modules/useTasks";

export interface ModalRef {
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

interface Props {
  message: string;
  showButtons?: boolean;
  loading?: boolean;

  onAccept?: () => void;
}

export const ModalComponent = forwardRef<ModalRef, Props>(
  ({ message, showButtons, loading, onAccept }, ref) => {
    const [modal, setModal] = useState<ModalInterface>();

    useEffect(() => {
      const $modalElement: HTMLElement | null =
        document.querySelector("#modalEl");

      const modalOptions: ModalOptions = {
        placement: "center",
        backdrop: "dynamic",
        backdropClasses:
          "bg-gray-900/50 fixed inset-0 z-40 transition-all duration-300 ease-out",
        closable: true,
        onShow: () => {
          const modalEl = document.querySelector("#modalEl");
          const contentEl = modalEl?.querySelector(".modal-content");

          if (modalEl && contentEl) {
            // Iniciar con el modal visible pero transparente
            modalEl.classList.remove("hidden");
            modalEl.classList.add("flex", "opacity-0");
            contentEl.classList.add("opacity-0", "scale-90", "translate-y-4");

            // Pequeño delay para que se apliquen las clases iniciales
            requestAnimationFrame(() => {
              modalEl.classList.remove("opacity-0");
              modalEl.classList.add("opacity-100");

              contentEl.classList.remove(
                "opacity-0",
                "scale-90",
                "translate-y-4"
              );
              contentEl.classList.add(
                "opacity-100",
                "scale-100",
                "translate-y-0"
              );
            });
          }
        },
        onHide: () => {
          const modalEl = document.querySelector("#modalEl");
          const contentEl = modalEl?.querySelector(".modal-content");

          if (modalEl && contentEl) {
            modalEl.classList.remove("opacity-100");
            modalEl.classList.add("opacity-0");

            contentEl.classList.remove(
              "opacity-100",
              "scale-100",
              "translate-y-0"
            );
            contentEl.classList.add("opacity-0", "scale-90", "translate-y-4");

            // Ocultar completamente después de la animación
            setTimeout(() => {
              modalEl.classList.remove("flex", "opacity-0");
              modalEl.classList.add("hidden");
            }, 4000);
          }
        },
      };

      const instanceOptions: InstanceOptions = {
        id: "modalEl",
        override: true,
      };

      const modalInstance = new Modal(
        $modalElement,
        modalOptions,
        instanceOptions
      );

      setModal(modalInstance);
    }, []);

    useEffect(() => {
      initFlowbite();
    }, []);

    useImperativeHandle(ref, () => ({
      show: () => modal?.show(),
      hide: () => modal?.hide(),
      toggle: () => modal?.toggle(),
    }));

    return (
      <div
        id="modalEl"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 transition-opacity duration-300 ease-out"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="modal-content relative rounded-lg bg-background shadow-lg transition-all duration-300 ease-out transform">
            <button
              onClick={() => modal?.hide()}
              type="button"
              className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all duration-200 hover:rotate-90"
            >
              <IoClose size={30} />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center flex flex-col items-center">
              <BiError size={80} color={Colors.danger} />
              <h3 className="mb-5 text-lg font-normal text-gray-500 ">
                {message}
              </h3>
              {showButtons && (
                <div className="flex flex-row gap-4 justify-center">
                  <button
                    disabled={loading}
                    onClick={onAccept}
                    type="button"
                    className="text-white cursor-pointer bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    {loading ? "Cargando" : "Yes, I'm sure"}
                  </button>
                  <button
                    onClick={() => modal?.hide()}
                    type="button"
                    className="py-2.5 px-5 cursor-pointer ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  >
                    No, cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ModalComponent.displayName = "ModalComponent";

interface PropsCrud {
  message?: string;
}

export const ModalForm = forwardRef<ModalRef, PropsCrud>((_, ref) => {
  const [modal, setModal] = useState<ModalInterface>();
  const module: Module = {
    title: "",
    number: 0,
    professor: "",
    subject: "",
  };
  const { moduleMutation } = useModules();
  const [alertForm, setAlertForm] = useState<{
    show: boolean;
    message?: string;
    success: boolean;
  }>({
    show: false,
    message: "El módulo ha sido guardado correctamente!",
    success: false,
  });

  useEffect(() => {
    const $modalCrud: HTMLElement | null =
      document.querySelector("#crud-modal");

    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses:
        "bg-gray-900/50 fixed inset-0 z-40 transition-all duration-300 ease-out",
      closable: true,
      onShow: () => {},
      onHide: () => {},
    };

    const instanceOptions: InstanceOptions = {
      id: "modal-crud",
      override: true,
    };

    const modalInstance = new Modal($modalCrud, modalOptions, instanceOptions);

    setModal(modalInstance);
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => modal?.show(),
    hide: () => modal?.hide(),
    toggle: () => modal?.toggle(),
  }));

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative bg-white w-2/5 rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear un nuevo módulo
            </h3>
            <button
              type="button"
              className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => modal?.hide()}
            >
              <IoClose size={30} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <Formik
            initialValues={module}
            validationSchema={moduleForm}
            onSubmit={async (formLike, { setSubmitting }) => {
              try {
                await moduleMutation.mutateAsync(formLike);
                setAlertForm((prev) => ({
                  ...prev,
                  success: true,
                  show: true,
                }));
              } catch (error: any) {
                setAlertForm({
                  show: true,
                  message: error.message,
                  success: false,
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,

              handleSubmit,
              handleChange,
              handleBlur,
            }) => (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Título
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Escribe el título del módulo"
                      value={values.title}
                      onChange={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />
                    <CustomErrorMessage
                      name="title"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="number"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Número
                    </label>
                    <input
                      type="number"
                      name="number"
                      id="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Escribe el número del módulo"
                      value={values.number}
                      onChange={handleChange("number")}
                      onBlur={handleBlur("number")}
                    />
                    <CustomErrorMessage
                      name="number"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="professor"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Profesor encargado
                    </label>
                    <input
                      type="text"
                      name="professor"
                      id="professor"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Escribe el nombre del profesor encargado"
                      value={values.professor}
                      onChange={handleChange("professor")}
                      onBlur={handleBlur("professor")}
                    />
                    <CustomErrorMessage
                      name="professor"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Materia
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Escribe la materia del módulo"
                      value={values.subject}
                      onChange={handleChange("subject")}
                      onBlur={handleBlur("subject")}
                    />
                    <CustomErrorMessage
                      name="subject"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                {alertForm.show && (
                  <MessageForm
                    isSuccess={alertForm.success}
                    message={alertForm.message!}
                  />
                )}
                <button
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                  type="submit"
                  className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    isSubmitting && "cursor-progress"
                  }`}
                >
                  <IoMdAddCircle className="mr-4" size={20} />
                  Agregar nuevo módulo
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
});

ModalForm.displayName = "ModalForm";

interface TaskCrud {
  moduleId: string;
}

export const ModalTask = forwardRef<ModalRef, TaskCrud>(({ moduleId }, ref) => {
  const [modal, setModal] = useState<ModalInterface>();
  const task: Task = {
    title: "",
    dueDate: new Date(),
    instructions: "",
    idModule: moduleId,
    publishedDate: new Date(),
  };
  const { tasksMutation } = useTasks(moduleId);
  const [alertForm, setAlertForm] = useState<{
    show: boolean;
    message?: string;
    success: boolean;
  }>({
    show: false,
    message: "La tarea ha sido creada correctamente!",
    success: false,
  });

  useEffect(() => {
    const $modalCrud: HTMLElement | null =
      document.querySelector("#crud-modal");

    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses:
        "bg-gray-900/50 fixed inset-0 z-40 transition-all duration-300 ease-out",
      closable: true,
      onShow: () => {},
      onHide: () => {},
    };

    const instanceOptions: InstanceOptions = {
      id: "modal-crud",
      override: true,
    };

    const modalInstance = new Modal($modalCrud, modalOptions, instanceOptions);

    setModal(modalInstance);
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => modal?.show(),
    hide: () => modal?.hide(),
    toggle: () => modal?.toggle(),
  }));

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative bg-white w-2/5 rounded-lg shadow-sm">
        <div className="relative p-4 w-full max-h-full">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Crear una nueva tarea para el módulo
            </h3>
            <button
              type="button"
              className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={() => modal?.hide()}
            >
              <IoClose size={30} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <Formik
            initialValues={task}
            validationSchema={taskForm}
            onSubmit={async (formLike, { setSubmitting, resetForm }) => {
              try {
                await tasksMutation.mutateAsync(formLike);
                setAlertForm((prev) => ({
                  ...prev,
                  success: true,
                  show: true,
                }));
                resetForm();
              } catch (error: any) {
                setAlertForm({
                  show: true,
                  message: error.message,
                  success: false,
                });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,

              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Título
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                      placeholder="Escribe el título de la tarea"
                      value={values.title}
                      onChange={handleChange("title")}
                      onBlur={handleBlur("title")}
                    />
                    <CustomErrorMessage
                      name="title"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Fecha límite
                    </label>
                    <CustomDatePicker
                      selected={values.dueDate}
                      onChange={(date) => setFieldValue("dueDate", date)}
                    />
                    <CustomErrorMessage
                      name="dueDate"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="instructions"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Instrucciones
                    </label>
                    <textarea
                      id="instructions"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary/60 focus:border-primary/60"
                      placeholder="Escribe las instrucciones para la tarea"
                      value={values.instructions}
                      onChange={handleChange("instructions")}
                      onBlur={handleBlur("instructions")}
                    ></textarea>
                    <CustomErrorMessage
                      name="instructions"
                      errors={errors}
                      touched={touched}
                    />
                  </div>
                </div>
                {alertForm.show && (
                  <MessageForm
                    isSuccess={alertForm.success}
                    message={alertForm.message!}
                  />
                )}
                <button
                  disabled={isSubmitting}
                  onClick={() => handleSubmit()}
                  type="submit"
                  className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    isSubmitting && "cursor-progress"
                  }`}
                >
                  <IoMdAddCircle className="mr-4" size={20} />
                  Agregar nuevo módulo
                </button>
              </>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
});

ModalTask.displayName = "ModalTask";
