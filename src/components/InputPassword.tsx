import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  password: string;

  changeText: (text: string) => void;
}

export const InputPassword = ({ changeText, password, ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="flex flex-row items-center">
      <input
        {...rest}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-primary-600 focus:border-primary/60 block w-full p-2.5"
        onChange={(e) => changeText(e.target.value)}
      />
      <div className="bg-gray-50 border border-gray-300 px-2 rounded-r-lg cursor-pointer place-self-stretch flex items-center">
        <FontAwesomeIcon
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? faEyeSlash : faEye}
          size="lg"
          className=""
        />
      </div>
    </div>
  );
};
