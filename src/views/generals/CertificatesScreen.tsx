import { useEffect, useState } from "react";
import type { Student } from "../../interfaces/Students";
import { useStudents } from "../../presentation/student/useStudent";
import type {
  FileCertificate,
  UserCertificate,
} from "../../interfaces/Certificates";
import { useCertificates } from "../../presentation/certificates/useCertificates";

export interface StudentCertificates {
  file: string;
  studentId: string;
  studentName: string;
}

export const CertificatesScreen = () => {
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [certificatesFileList, setCertificatesFileList] = useState<
    FileCertificate[]
  >([]);
  const [studentCertificates, setStudentCertificates] = useState<
    StudentCertificates[]
  >([]);
  const [studentsCertificatesList, setStudentsCertificatesList] = useState<
    UserCertificate[]
  >([]);

  const { studentsQuery } = useStudents("");
  const { filesQuery, certificatesMutation, usersWithCertificatesQuery } =
    useCertificates();

  useEffect(() => {
    if (studentsQuery.data) setStudentsList(studentsQuery.data);
  }, [studentsQuery.data]);

  useEffect(() => {
    if (usersWithCertificatesQuery.data)
      setStudentsCertificatesList(usersWithCertificatesQuery.data);
  }, [usersWithCertificatesQuery.data]);

  useEffect(() => {
    if (filesQuery.data) {
      const initialData: StudentCertificates[] = filesQuery.data.map(
        (item) => ({
          file: item.name,
          studentId: "",
          studentName: "",
        })
      );
      setStudentCertificates(initialData);
    }
  }, [filesQuery.data]);

  useEffect(() => {
    if (filesQuery.data) setCertificatesFileList(filesQuery.data);
  }, [filesQuery.data]);

  return (
    <div>
      <h2 className="text-center font-semibold text-xl my-8">Certificados</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Estudiante
              </th>
              <th scope="col" className="px-6 py-3">
                Certificado
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsCertificatesList.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-gray-200"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.lastName} {item.firstName}
                </th>
                <td className="px-6 py-4">
                  <a
                    href={`${item.url}`}
                    target="_blank"
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Ir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        // onClick={() => certificatesMutation.mutate()}
        onClick={() => certificatesMutation.mutate(studentCertificates)}
        disabled={certificatesMutation.isPending}
        className={`bg-primary p-4 rounded-xl font-semibold text-white cursor-pointer ${
          certificatesMutation.isPending && "cursor-progress"
        }`}
      >
        Guardar data
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Certificado
              </th>
              <th scope="col" className="px-6 py-3">
                Estudiante
              </th>
              <th scope="col" className="px-6 py-3">
                UUID
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {certificatesFileList.map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 border-gray-200"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <label htmlFor="student" hidden>
                    Choose a flavor:
                  </label>
                  <input
                    list="students"
                    id="student"
                    name="student"
                    className="border p-2 rounded-xl"
                    placeholder="Escoger estudiante"
                    onChange={(value) =>
                      setStudentCertificates((prev) =>
                        prev.map((a) =>
                          a.file === item.name
                            ? { ...a, studentName: value.target.value }
                            : a
                        )
                      )
                    }
                  />

                  <datalist id="students">
                    {studentsList.map((student, indexS) => (
                      <option key={indexS} value={student.lastName}></option>
                    ))}
                  </datalist>
                </td>
                <td className="px-6 py-4">
                  {
                    studentCertificates.find((s) => s.file === item.name)
                      ?.studentId
                  }
                </td>
                <td className="px-6 py-4">
                  <p
                    onClick={() =>
                      setStudentCertificates((prev) =>
                        prev.map((a) =>
                          a.file === item.name
                            ? {
                                ...a,
                                studentId: studentsList.find(
                                  (s) => s.lastName === a.studentName
                                )?.id!,
                              }
                            : a
                        )
                      )
                    }
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
