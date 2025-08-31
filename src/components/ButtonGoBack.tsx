import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Colors } from "../assets/colors";

export const ButtonGoBack = () => {
  const navigate = useNavigate();
  return (
    <button
      className="absolute cursor-pointer hover:transition hover:delay-150 hover:scale-115"
      onClick={() => navigate(-1)}
    >
      <IoArrowBackOutline size={30} color={Colors.secondary} />
    </button>
  );
};
