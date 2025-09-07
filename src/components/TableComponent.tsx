import { FaUserGraduate } from "react-icons/fa6";
import { getFormattedDate } from "../actions/get-date-formatted";
import type { Book } from "../interfaces/Library";
import type { Notice } from "../interfaces/Notice";
import type { Payment } from "../interfaces/Payment";
import type { Student } from "../interfaces/Students";
import { Colors } from "../assets/colors";
import { Link } from "react-router";
import type { ModuleGrade, StudentGradeModule } from "../interfaces/Grades";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
  payments: Payment[];
}

export const TablePayments = ({ payments }: Props) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4 mx-auto my-5">
      <h2 className="my-2 font-semibold text-center">Pagos subidos</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Archivo
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    checked={item.state}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <a
                  onClick={() => window.open(item.url, "_blank")}
                  className="cursor-pointer hover:underline hover:underline-offset-2"
                >
                  {item.file}
                </a>
              </th>
              <td className="px-6 py-4">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface NoticesProps {
  notices: Notice[];
}

export const TableNotices = ({ notices }: NoticesProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              Fecha
            </th>
            <th scope="col" className="px-3 py-3">
              Asunto
            </th>
            <th scope="col" className="px-3 py-3">
              Descripción
            </th>
            <th scope="col" className="px-3 py-3">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {notices.map((item) => (
            <tr key={item.id} className="bg-white border-b border-gray-200">
              <td className="px-3 py-4 whitespace-nowrap">
                {getFormattedDate(item.date)}
              </td>
              <td className="px-3 py-4 font-semibold">{item.title}</td>
              <td className="px-3 py-4">
                <p className="whitespace-pre-line">{item.description}</p>
              </td>
              <th
                scope="row"
                className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
              >
                {item.url && (
                  <a
                    onClick={() => window.open(item.url, "_blank")}
                    className="cursor-pointer hover:underline hover:underline-offset-2 text-secondary"
                  >
                    Ir
                  </a>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface BooksProps {
  books: Book[];
}

export const TableBooks = ({ books }: BooksProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              Título
            </th>
            <th scope="col" className="px-3 py-3">
              Autores
            </th>
            <th scope="col" className="px-3 py-3">
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <tr key={item.id} className="bg-white border-b border-gray-200">
              <td className="px-3 py-4">{item.title}</td>
              <td className="px-3 py-4">{item.authors}</td>
              <th
                scope="row"
                className="px-3 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
              >
                {item.url && (
                  <a
                    onClick={() => window.open(item.url, "_blank")}
                    className="cursor-pointer hover:underline hover:underline-offset-2 text-secondary"
                  >
                    Ir
                  </a>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface StudentsProps {
  students: Student[] | StudentGradeModule[];
  grades?: boolean;
  idModule?: number;
  module?: boolean;
  search?: string;

  onChangeSearch?: (value: string) => void;
}

export const TableStudents = ({
  students,
  grades,
  idModule,
  module,
  search,

  onChangeSearch,
}: StudentsProps) => {
  const goRoute = (id: number): string => {
    if (grades) return `/generals/student/${id}/module/${idModule}/exam`;
    else if (module) return `/generals/grades/students/${id}`;
    return `/generals/student/${id}`;
  };

  return (
    <div className="mb-10">
      {!grades && (
        <h2 className="text-center font-bold my-6 text-2xl text-secondary">
          Listado de estudiantes
        </h2>
      )}
      {onChangeSearch && (
        <div className="max-w-md mx-auto mb-6">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline className="w-6 h-6 text-gray-500" />
            </div>
            <input
              value={search}
              onChange={(e) => onChangeSearch && onChangeSearch(e.target.value)}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Busca por nombres o apellidos"
              required
            />
          </div>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Estudiante
              </th>
              {grades && (
                <th scope="col" className="px-6 py-3">
                  Calificación
                </th>
              )}
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {student.urlPhoto ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={student.urlPhoto}
                      alt="Jese image"
                    />
                  ) : (
                    <FaUserGraduate
                      className="w-10 h-10 bg-secondary/10 rounded-full"
                      color={Colors.secondary}
                    />
                  )}
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {student.lastName} {student.firstName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {student.email}
                    </div>
                  </div>
                </th>
                {grades && (
                  <td className="px-6 py-4 text-base font-semibold">
                    {"grade" in student && student.state
                      ? student.grade.toFixed(2)
                      : "No calificado"}
                  </td>
                )}
                <td className="px-6 py-4">
                  <Link
                    to={goRoute(student.id!)}
                    className="font-medium text-primary hover:underline"
                  >
                    {grades ? "Calificar" : "Ingresar"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface GradesProps {
  grades: ModuleGrade[];
  idStudent?: number;
}

export const TableGrades = ({ grades, idStudent }: GradesProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Conferencia
            </th>
            <th scope="col" className="px-6 py-3">
              Calificación
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de calificación
            </th>
            {idStudent && (
              <th scope="col" className="px-6 py-3">
                Editar
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {grades.map((item, index) => (
            <tr key={index} className="bg-white border-b border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Conferencia N° {item.module}
              </th>
              <td className="px-6 py-4 text-center">{item.grade.toFixed(2)}</td>
              <td className="px-6 py-4">
                {getFormattedDate(`${item.gradedAt}`)}
              </td>
              {idStudent && (
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/generals/student/${idStudent}/module/${item.idModule}/exam`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Ir
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
