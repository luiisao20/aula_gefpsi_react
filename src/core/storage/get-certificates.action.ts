import { supabase } from "../../../supabase";
import type { FileCertificate } from "../../interfaces/Certificates";

export const getFileCertificates = async (): Promise<FileCertificate[]> => {
  const certificates: FileCertificate[] = [];

  const { data, error } = await supabase.storage
    .from("certificates")
    .list("new-national", { sortBy: { column: "name", order: "asc" } });

  if (error) throw new Error(error.message);

  for (const element of data) {
    certificates.push({
      id: element.id,
      name: element.name
    })
  }

  return certificates;
};
