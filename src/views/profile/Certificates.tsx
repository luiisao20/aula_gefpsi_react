import { useEffect, useState } from "react";
import { useAuthStore } from "../../presentation/auth/useAuthStore";
import { useStudentCertificates } from "../../presentation/certificates/useStudentCertificates";
import type { StudentCertificate } from "../../interfaces/Certificates";

export const CertificatesStudent = () => {
  const [certificatesList, setCertificatesList] = useState<
    StudentCertificate[]
  >([]);
  const { user } = useAuthStore();

  const { certificatesQuery } = useStudentCertificates(user?.id);

  useEffect(() => {
    if (certificatesQuery.data) setCertificatesList(certificatesQuery.data);
  }, [certificatesQuery.data]);

  return (
    <div className="p-4 rounded-xl bg-white">
      <h2 className="text-center font-bold text-2xl text-secondary">
        Certificados
      </h2>
      <div className="relative w-3/4 mx-auto overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Certificado
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {certificatesList.map((item, index) => (
              <tr key={index} className="bg-white border-b border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.type === "approval"
                    ? "Aprobación"
                      : item.type === "latin"
                        ? "Latinoamericano"
                        : "Nacional"}
                </th>
                <td className="px-6 py-4">
                  <a
                    href={item.url}
                    target="_blank"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
