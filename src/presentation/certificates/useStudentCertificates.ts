import { useQuery } from "@tanstack/react-query";
import { getStudentCertificates } from "../../core/database/certificates/get-student-certificates.action";

export const useStudentCertificates = (studentId?: string) => {
  const certificatesQuery = useQuery({
    queryFn: () => getStudentCertificates(studentId!),
    queryKey: ["certificates", studentId],
    staleTime: 1000 * 60 * 60,
    enabled: !!studentId,
  });

  return { certificatesQuery };
};
