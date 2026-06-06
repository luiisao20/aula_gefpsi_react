import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFileCertificates } from "../../core/storage/get-certificates.action";
import { insertDataCertificates } from "../../core/database/certificates/insert-data-certificates.action";
import type { StudentCertificates } from "../../views/generals/CertificatesScreen";
import { getUserCertificates } from "../../core/database/certificates/get-user-certificates.action";

export const useCertificates = () => {
  const queryClient = useQueryClient();
  const filesQuery = useQuery({
    queryFn: getFileCertificates,
    staleTime: 1000 * 60 * 60,
    queryKey: ["files-certificates"],
  });

  const usersWithCertificatesQuery = useQuery({
    queryFn: getUserCertificates,
    queryKey: ["certifications-approval"],
    staleTime: 1000 * 60 * 60,
  });

  const certificatesMutation = useMutation({
    // mutationFn: () => updateLatinCertificatesUrl(),
    mutationFn: (data: StudentCertificates[]) => insertDataCertificates(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certifications-approval"],
      });
      alert("Exito!");
    },

    onError: (error) => {
      alert(error);
    },
  });

  return { filesQuery, certificatesMutation, usersWithCertificatesQuery };
};
