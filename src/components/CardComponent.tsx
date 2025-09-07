import { FaArrowRight } from "react-icons/fa6";
import type { Feature } from "../views/Home";
import { useNavigate } from "react-router";

interface Props {
  item: Feature;
}

export const CardComponent = ({ item }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm shadow-secondary hover:transition hover:delay-100 hover:scale-115">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {item.shortDescription}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {item.detailedDescription}
      </p>
      <button
        onClick={() => navigate(item.route)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-secondary cursor-pointer rounded-lg hover:bg-secondary/60 focus:ring-4 focus:outline-none focus:ring-secondary/30"
      >
        {item.title}
        <FaArrowRight className="ml-4" />
      </button>
    </div>
  );
};
