import { FaCircleInfo } from "react-icons/fa6";

interface Props {
  isSuccess: boolean;
  message: string;
}

export const MessageForm = ({ isSuccess, message }: Props) => {
  if (isSuccess) {
    return (
      <div
        className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
        role="alert"
      >
        <FaCircleInfo className="mr-4" size={20} />
        <div>
          <span className="font-medium">¡Éxito!</span> {message}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
      role="alert"
    >
      <FaCircleInfo className="mr-4" size={20} />
      <div>
        <span className="font-medium">¡Error!</span> {message}
      </div>
    </div>
  );
};
