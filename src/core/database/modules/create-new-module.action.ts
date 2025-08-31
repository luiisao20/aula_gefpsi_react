import type { Module } from "../../../interfaces/Module";
import api from "../../../../api";

export const createNewModule = async (module: Module): Promise<number> => {
  try {
    const res = await api.post("/modules", module);
    return res.data.id;
  } catch (error) {
    throw error;
  }
};
