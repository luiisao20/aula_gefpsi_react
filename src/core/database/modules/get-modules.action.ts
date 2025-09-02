import type { Module } from "../../../interfaces/Module";
import api from "../../../../api";

export const getModules = async (): Promise<Module[]> => {
  const modules: Module[] = [];
  try {
    const res = await api.get("/modules");

    for (const element of res.data) {
      const module: Module = {
        id: element.id,
        subject: element.subject,
        title: element.title,
        professor: element.professor,
        number: element.module_number,
        status: element.status
      };
      modules.push(module);
    }
    return modules;
  } catch (error) {
    throw error;
  }
};
