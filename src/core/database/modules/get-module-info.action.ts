import type {
  Bibliography,
  Content,
  Module,
  Objective,
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
      status: res.data.status
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
): Promise<Content[]> => {
  const contents: Content[] = [];

  try {
    const res = await api.get(`/modules/contents/${idModule}`);

    for (const element of res.data) {
      const response: Content = {
        id: element.id,
        topic: element.topic,
        idModule: element.id_module,
      };
      contents.push(response);
    }
    return contents;
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
