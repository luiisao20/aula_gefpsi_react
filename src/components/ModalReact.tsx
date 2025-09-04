import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

import { Colors } from "../assets/colors";
import type { ModalReactProps } from "../views/modules/module/ExamScreen";

interface Props extends ModalReactProps {
  onClose: () => void;
  onConfirm: () => void;
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
  const style = {
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
