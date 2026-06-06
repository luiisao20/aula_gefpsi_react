import { supabase } from "../../../../supabase";
import type { StudentCertificates } from "../../../views/generals/CertificatesScreen";

const getUrl = (file: string): string => {

  const { data } = supabase.storage
    .from("certificates")
    .getPublicUrl(`new-national/${file}`);

  return data.publicUrl;
};

export const updateLatinCertificatesUrl = async () => {
  const { data: certificates, error: fetchError } = await supabase
    .from("certificates")
    .select("id, user_id, file_name, url, type")
    .like("file_name", "Listado latinoamericano%");

  if (fetchError) throw new Error(fetchError.message);

  if (!certificates || certificates.length === 0) return;

  const toUpdate = certificates
    .filter((cert) => cert.url.includes("/approval/"))
    .map((cert) => ({
      id: cert.id,
      user_id: cert.user_id,
      file_name: cert.file_name,
      url: cert.url.replace("/approval/", "/new-latins/"),
      type: "latin",
    }));

  if (toUpdate.length === 0) return;

  const { error: updateError } = await supabase
    .from("certificates")
    .upsert(toUpdate);

  if (updateError) throw new Error(updateError.message);
};

export const insertDataCertificates = async (data: StudentCertificates[]) => {
  const payload = data
    .filter((item) => item.studentId.length > 0 && item.file.length > 0)
    .map((item) => ({
      user_id: item.studentId,
      file_name: item.file,
      url: getUrl(item.file),
      type: "other",
    }));

  if (payload.length === 0) {
    throw new Error("No hay certificados con estudiantes asignados");
  }

  const { error } = await supabase.from("certificates").insert(payload);

  if (error) throw new Error(error.message);
};
