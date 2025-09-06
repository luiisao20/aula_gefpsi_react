import type {
  Bibliography,
  Content,
  ExtraContent,
  Module,
  Objective,
  VideoConference,
} from "../../../interfaces/Module";
import api from "../../../../api";
import { supabase } from "../../../../supabase";

export const getModuleInfo = async (id: string): Promise<Module> => {
  const { data, error } = await supabase
    .from("modules")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  const response: Module = {
    id: data.id,
    number: data.module_number,
    professor: data.professor,
    subject: data.subject,
    title: data.title,
    status: data.status,
  };
  return response;
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
  const { data, error } = await supabase
    .from("contents")
    .select()
    .eq("id_module", idModule);

  if (error) throw new Error(error.message);

  const content: Content = {
    id: data[0].id,
    topic: data[0].topic,
    idModule: data[0].id_module,
  };
  return content;
};

export const getExtraContentByModule = async (
  idModule: string
): Promise<ExtraContent[]> => {
  const extraContents: ExtraContent[] = [];

  const { data, error } = await supabase
    .from("extra_content")
    .select()
    .eq("id_module", idModule);

  if (error) throw new Error(error.message);

  for (const element of data) {
    extraContents.push({
      id: element.id,
      url: element.url,
      description: element.description,
      idModule: element.id_module,
    });
  }
  return extraContents;
};

export const getBibliographyByModule = async (
  idModule: string
): Promise<Bibliography[]> => {
  const bibliography: Bibliography[] = [];

  const { data, error } = await supabase
    .from("bibliographies")
    .select()
    .eq("id_module", idModule);

  if (error) throw error;

  for (const element of data) {
    bibliography.push({
      id: element.id,
      reference: element.reference,
      idModule: element.id_module,
    });
  }
  return bibliography;
};

export const getVideoConferenceByModule = async (
  idModule: number
): Promise<VideoConference> => {
  const { data, error } = await supabase
    .from("video_conferences")
    .select()
    .eq("id_module", idModule);

  if (error) throw new Error(error.message);

  const newVideoConference: VideoConference = {
    id: data[0].id,
    url: data[0].url,
    idModule: data[0].id_module,
  };
  return newVideoConference;
};
