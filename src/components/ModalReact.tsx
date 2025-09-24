import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

import { Colors } from "../assets/colors";
import { Formik } from "formik";
import { adForm, moduleForm, taskForm } from "../actions/get-error-forms";
import { CustomErrorMessage } from "./CustomErrorMessage";
import { IoMdAddCircle } from "react-icons/io";
import type { Module, Task } from "../interfaces/Module";
import type { SxProps } from "@mui/material/styles";
import type { Theme } from "@emotion/react";
import dayjs from "dayjs";
import { CustomDatePicker } from "./DatePicker";
import type { Notice } from "../interfaces/Notice";

export interface ModalReactProps {
  open: boolean;
  message?: string;
  warning?: boolean;
  showButtons?: boolean;
  loading?: boolean;
  moduleId?: string;
}

interface Props extends ModalReactProps {
  onClose: () => void;
  onConfirm?: () => void;
  onSendData?: (data: Module | Task | Notice) => void;
}

export const ModalReact = ({
  open,
  message,
  warning,
  showButtons,
  loading,

  onClose,
  onConfirm,
}: Props) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="relative p-4 w-full max-w-md max-h-full flex justify-center items-center">
            <div className="modal-content relative rounded-lg bg-background shadow-lg transition-all duration-300 ease-out transform">
              <button
                onClick={onClose}
                type="button"
                className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all duration-200 hover:rotate-90"
              >
                <IoClose size={30} />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center flex flex-col items-center">
                {warning ? (
                  <BiError size={80} color={Colors.danger} />
                ) : (
                  <GiConfirmed size={80} color={Colors.success} />
                )}
                <h3 className="mb-5 text-lg font-normal text-gray-500 whitespace-pre-line">
                  {message}
                </h3>
                {showButtons && (
                  <div className="flex flex-row gap-4 justify-center">
                    <button
                      disabled={loading}
                      onClick={onConfirm}
                      type="button"
                      className={`text-white cursor-pointer  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center  ${
                        warning
                          ? "bg-red-600 hover:bg-red-800 focus:ring-red-300"
                          : "bg-success hover:bg-success/60 focus:ring-success/30"
                      }`}
                    >
                      {loading ? "Cargando" : "Sí, estoy seguro"}
                    </button>
                    <button
                      onClick={onClose}
                      type="button"
                      className="py-2.5 px-5 cursor-pointer ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                      No, cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export const ModalRForm = ({
  open,
  loading,

  onClose,
  onSendData = () => {},
}: Props) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    width: "50%",
  };

  const module: Module = {
    title: "",
    number: 0,
    professor: "",
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="relative p-4 w-full max-h-full">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Crear una nueva conferencia
                </h3>
                <button
                  type="button"
                  className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-all duration-200 hover:rotate-90"
                  onClick={onClose}
                >
                  <IoClose size={30} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Formik
                initialValues={module}
                validationSchema={moduleForm}
                onSubmit={(formLike) => onSendData(formLike)}
              >
                {({
                  values,
                  errors,
                  touched,

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
                    </div>
                    <button
                      disabled={loading}
                      onClick={() => handleSubmit()}
                      type="submit"
                      className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        loading && "cursor-progress"
                      }`}
                    >
                      <IoMdAddCircle className="mr-4" size={20} />
                      Agregar nueva conferencia
                    </button>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export const ModalRTask = ({
  open,
  loading,
  moduleId,

  onClose,
  onSendData = () => {},
}: Props) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    width: "50%",
  };

  const task: Task = {
    title: "",
    dueDate: dayjs(new Date()),
    instructions: "",
    idModule: moduleId,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="relative p-4 w-full max-h-full">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Crear una nueva tarea para el módulo
                </h3>
                <button
                  type="button"
                  className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={onClose}
                >
                  <IoClose size={30} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Formik
                initialValues={task}
                validationSchema={taskForm}
                onSubmit={async (formLike, { resetForm }) => {
                  onSendData(formLike);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,

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
                    <button
                      disabled={loading}
                      onClick={() => handleSubmit()}
                      type="submit"
                      className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        loading && "cursor-progress"
                      }`}
                    >
                      <IoMdAddCircle className="mr-4" size={20} />
                      Agregar nueva tarea
                    </button>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export const ModalAd = ({
  open,
  loading,

  onClose,
  onSendData = () => {},
}: Props) => {
  const style: SxProps<Theme> = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
    width: "40%",
  };

  const notice: Notice = {
    url: "",
    title: "",
    description: "",
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className="relative bg-white rounded-lg shadow-sm">
            <div className="relative p-4 w-full max-h-full">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Crear un nuevo aviso
                </h3>
                <button
                  type="button"
                  className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={onClose}
                >
                  <IoClose size={30} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Formik
                initialValues={notice}
                validationSchema={adForm}
                onSubmit={async (formLike, { resetForm }) => {
                  console.log(formLike);
                  
                  onSendData(formLike);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,

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
                          Asunto
                        </label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                          placeholder="Escribe el asunto del aviso"
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
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Descripción
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary/60 focus:border-primary/60"
                          placeholder="Escribe la descripción del aviso"
                          value={values.description}
                          onChange={handleChange("description")}
                          onBlur={handleBlur("description")}
                        ></textarea>
                        <CustomErrorMessage
                          name="description"
                          errors={errors}
                          touched={touched}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="url"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Link
                      </label>
                      <input
                        type="text"
                        name="url"
                        id="url"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/60 focus:border-primary/60 block w-full p-2.5"
                        placeholder="Agrega un link al aviso (opcional)"
                        value={values.url}
                        onChange={handleChange("url")}
                        onBlur={handleBlur("url")}
                      />
                      <CustomErrorMessage
                        name="url"
                        errors={errors}
                        touched={touched}
                      />
                    </div>
                    <button
                      disabled={loading}
                      onClick={() => handleSubmit()}
                      type="submit"
                      className={`text-white inline-flex items-center bg-secondary hover:bg-secondary/60 cursor-pointer focus:ring-4 focus:outline-none focus:ring-secondary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                        loading && "cursor-progress"
                      }`}
                    >
                      <IoMdAddCircle className="mr-4" size={20} />
                      Agregar nuevo aviso
                    </button>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
