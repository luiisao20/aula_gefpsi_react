import { FaCheckSquare } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { MdTask } from "react-icons/md";
import {PiStudentBold, PiVideoConferenceFill} from "react-icons/pi";
import { RiInfoCardFill } from "react-icons/ri";
import { NavLink } from "react-router";

interface Props {
  styles?: string;
}

export const BreadCumbComponent = () => {
  return (
    <nav className="flex justify-center" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <NavLink
            to={`info`}
            className={({ isActive }) =>
              `inline-flex items-center text-sm font-medium text-gray-700 ${
                isActive && "text-secondary"
              }`
            }
          >
            <RiInfoCardFill className="mr-2" size={20} />
            Información general
          </NavLink>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward size={18} className="text-gray-400 mx-1" />
            <NavLink
              to={`tasks`}
              className={({ isActive }) =>
                `inline-flex items-center text-sm font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <MdTask className="mr-2" size={20} />
              Trabajos sincrónicos
            </NavLink>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward size={18} className="text-gray-400 mx-1" />
            <NavLink
              to={`exam`}
              className={({ isActive }) =>
                `inline-flex items-center text-sm font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <FaCheckSquare className="mr-2" size={20} />
              Examen
            </NavLink>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export const BreadCumbComponentStudent = ({ styles }: Props) => {
  return (
    <nav className={`flex justify-center ${styles}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li>
          <div className="flex items-center">
            <NavLink
              to={`exam`}
              className={({ isActive }) =>
                `inline-flex items-center text-sm font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <FaCheckSquare className="mr-2" size={20} />
              Examen
            </NavLink>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward size={18} className="text-gray-400 mx-1" />
            <NavLink
              to={`tasks`}
              className={({ isActive }) =>
                `inline-flex items-center text-sm font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <MdTask className="mr-2" size={20} />
              Trabajos sincrónicos
            </NavLink>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export const BreadCumbComponentGrades = ({ styles }: Props) => {
  return (
    <nav className={`flex justify-center ${styles}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li>
          <div className="flex items-center">
            <NavLink
              to={`conferences`}
              className={({ isActive }) =>
                `inline-flex items-center text-base font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <PiVideoConferenceFill className="mr-2" size={30} />
              Conferencias
            </NavLink>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <IoIosArrowForward size={18} className="text-gray-400 mx-1" />
            <NavLink
              to={`students`}
              className={({ isActive }) =>
                `inline-flex items-center text-base font-medium text-gray-700 ${
                  isActive && "text-secondary"
                }`
              }
            >
              <PiStudentBold className="mr-2" size={30} />
              Estudiantes
            </NavLink>
          </div>
        </li>
      </ol>
    </nav>
  );
};
