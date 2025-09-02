import api from "../../../../api";
import type {ExtraContent} from "../../../interfaces/Module";

export const insertObjectivesByModule = async (
  idModule: string,
  objectives: string[]
) => {
  try {
    const result = await api.post("/modules/objectives", {
      idModule,
      objectives,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertExtraContentByModule = async (
  idModule: string,
  extraContent: ExtraContent[]
) => {
  try {
    const result = await api.post("/modules/extra_contents", {
      idModule,
      extraContent,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertContentsByModule = async (
  idModule: string,
  topic: string
) => {
  try {
    const result = await api.post("/modules/contents", {
      idModule,
      topic,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertBibliographyByModule = async (
  idModule: string,
  bibliography: string[]
) => {
  try {
    const result = await api.post("/modules/bibliography", {
      idModule,
      bibliography,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const insertVideoConferenceByModule = async (
  idModule: string,
  url: string
) => {
  try {
    const res = await api.post("/modules/video_conferences", {
      idModule,
      url,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
