import api from "../../../../api";
import type {
  ModuleGrade,
  StudentGradeModule,
} from "../../../interfaces/Grades";

export const getGradesByModule = async (
  idModule: number
): Promise<StudentGradeModule[]> => {
  try {
    const res = await api(`/students/exam/results/module/${idModule}`);

    return res.data as StudentGradeModule[];
  } catch (error) {
    throw error;
  }
};

export const getGradesByStudent = async (
  idStudent: number
): Promise<ModuleGrade[]> => {
  try {
    const res = await api.get(`/students/exam/results/modules/${idStudent}`);
    return res.data as ModuleGrade[];
  } catch (error) {
    throw error;
  }
};
