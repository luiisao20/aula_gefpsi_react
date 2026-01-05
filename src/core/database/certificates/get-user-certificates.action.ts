import { supabase } from "../../../../supabase";
import type { UserCertificate } from "../../../interfaces/Certificates";

export const getUserCertificates = async (): Promise<UserCertificate[]> => {
  const response: UserCertificate[] = [];

  const { data, error } = await supabase.rpc("get_user_certificates");

  if (error) throw new Error(error.message);

  for (const element of data) {
    response.push({
      firstName: element.first_name,
      id: element.id,
      lastName: element.last_name,
      url: element.url,
    });
  }

  return response;
};
