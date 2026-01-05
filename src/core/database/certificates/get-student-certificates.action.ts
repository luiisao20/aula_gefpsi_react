import { supabase } from "../../../../supabase";
import type { StudentCertificate } from "../../../interfaces/Certificates";

export const getStudentCertificates = async (
  studentId: string
): Promise<StudentCertificate[]> => {
  const certificates: StudentCertificate[] = [];

  const { data, error } = await supabase
    .from("certificates")
    .select()
    .eq("user_id", studentId);

  if (error) throw new Error(error.message);

  for (const element of data) {
    certificates.push({
      id: element.id,
      fileName: element.file_name,
      url: element.url,
      type: element.type,
    });
  }

  return certificates;
};
