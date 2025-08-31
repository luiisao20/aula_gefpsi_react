import api from "../../../../api";

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

export const insertContentsByModule = async (
  idModule: string,
  contents: string[]
) => {
  try {
    const result = await api.post("/modules/contents", {
      idModule,
      contents,
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
