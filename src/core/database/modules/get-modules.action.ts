import axios from "axios";
import type { Module } from "../../../interfaces/Module";

export const getModules = async (): Promise<Module[]> => {
  const modules: Module[] = [];
  try {
    const res = await axios.get("http://localhost:5000/modules");

    for (const element of res.data) {
      const module: Module = {
        id: element.id,
        subject: element.subject,
        title: element.title,
        professor: element.professor,
        number: element.module_number,
      };
      modules.push(module);
    }
    return modules;
  } catch (error) {
    throw error;
  }
};
