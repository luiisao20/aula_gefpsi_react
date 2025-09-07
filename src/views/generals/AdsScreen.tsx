import { FaTools } from "react-icons/fa";
import {UnionQuestions} from "../../components/UnionQuestions";

export const AdsScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <h1 className="font-bold text-danger">Seguimos trabajando aquí</h1>
      <FaTools size={80} className="text-danger" />
      <UnionQuestions />
    </div>
  );
};
