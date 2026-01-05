import { supabase } from "../../../../supabase";
import type { StudentCertificates } from "../../../views/generals/CertificatesScreen";

const getUrl = (file: string): string => {
  const { data } = supabase.storage
    .from("certificates")
    .getPublicUrl(`approval/${file}`);

  return data.publicUrl;
};

export const insertDataCertificates = async (data: StudentCertificates[]) => {
  const payload = data.map((item) => ({
    user_id: item.studentId,
    file_name: item.file,
    url: getUrl(item.file),
  }));

  const { error } = await supabase.from("certificates").insert(payload);

  if (error) throw new Error(error.message);
};
