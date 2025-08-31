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

export const publishModule = async (id: string, value: boolean) => {
  try {
    const res = await api.put(`/modules/${id}`, { value });
    return res.data;
  } catch (error) {
    throw error;
  }
};
