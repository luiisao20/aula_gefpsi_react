import type {
  Bibliography,
  Content,
  ExtraContent,
  Module,
  Objective,
  VideoConference,
} from "../../../interfaces/Module";
import api from "../../../../api";

export const getModuleInfo = async (id: string): Promise<Module> => {
  try {
    const res = await api.get(`/modules/${id}`);

    const response: Module = {
      id: res.data.id,
      number: res.data.module_number,
      professor: res.data.professor,
      subject: res.data.subject,
      title: res.data.title,
      status: res.data.status,
    };
    return response;
  } catch (error) {
    throw error;
  }
};

export const getObjectivesByModule = async (
  idModule: string
): Promise<Objective[]> => {
  const objectives: Objective[] = [];

  try {
    const res = await api.get(`/modules/objectives/${idModule}`);

    for (const element of res.data) {
      const response: Objective = {
        id: element.id,
        description: element.description,
        idModule: element.id_module,
      };
      objectives.push(response);
    }
    return objectives;
  } catch (error) {
    throw error;
  }
};

export const getContentsByModule = async (
  idModule: string
): Promise<Content> => {
  try {
    const res = await api.get(`/modules/contents/${idModule}`);

    const content: Content = {
      id: res.data.id,
      topic: res.data.topic,
      idModule: res.data.id_module,
    };
    return content;
  } catch (error) {
    throw error;
  }
};

export const getExtraContentByModule = async (
  idModule: string
): Promise<ExtraContent[]> => {
  const extraContents: ExtraContent[] = [];

  try {
    const res = await api.get(`/modules/extra_contents/${idModule}`);

    for (const element of res.data) {
      const response: ExtraContent = {
        id: element.id,
        url: element.url,
        description: element.description,
        idModule: element.id_module,
      };
      extraContents.push(response);
    }
    return extraContents;
  } catch (error) {
    throw error;
  }
};

export const getBibliographyByModule = async (
  idModule: string
): Promise<Bibliography[]> => {
  const bibliography: Bibliography[] = [];

  try {
    const res = await api.get(`/modules/bibliography/${idModule}`);

    for (const element of res.data) {
      const response: Bibliography = {
        id: element.id,
        reference: element.reference,
        idModule: element.id_module,
      };
      bibliography.push(response);
    }
    return bibliography;
  } catch (error) {
    throw error;
  }
};

export const getVideoConferenceByModule = async (
  idModule: string
): Promise<VideoConference> => {
  try {
    const res = await api.get(`/modules/video_conference/${idModule}`);
    const newVideoConference: VideoConference = {
      id: res.data.id,
      url: res.data.url,
      idModule: res.data.id_module,
    };
    return newVideoConference;
  } catch (error) {
    throw error;
  }
};
