import { getFormattedDate } from "../actions/get-date-formatted";
import type { Book } from "../interfaces/Library";
import type { Notice } from "../interfaces/Notice";
import type { Payment } from "../interfaces/Payment";

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
                <p>{item.description}</p>
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
