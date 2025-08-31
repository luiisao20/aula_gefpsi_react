import type { Notice } from "../../../interfaces/Notice";
import api from "../../../../api";

export const getAds = async (): Promise<Notice[]> => {
  const notices: Notice[] = [];
  try {
    const res = await api.get("/ads");

    for (const element of res.data) {
      const notice: Notice = {
        id: element.id,
        date: element.date_published,
        title: element.title,
        description: element.description,
        url: element.url,
      };
      notices.push(notice);
    }
    return notices;
  } catch (error) {
    throw error;
  }
};
