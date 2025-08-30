import axios from "axios";
import type { Module } from "../../../interfaces/Module";

export const createNewModule = async (module: Module): Promise<number> => {
  try {
    const res = await axios.post("http://localhost:5000/modules", module);
    return res.data.id;
  } catch (error) {
    throw error;
  }
};
