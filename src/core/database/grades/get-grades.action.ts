import { supabase } from "../../../../supabase";
import type {
  ModuleGrade,
  StudentGradeModule,
} from "../../../interfaces/Grades";
import type { Student } from "../../../interfaces/Students";

export const getGradesByModule = async (
  idModule: number,
  students: Student[]
): Promise<StudentGradeModule[]> => {
  const grades: StudentGradeModule[] = [];
  for (const element of students) {
    const { firstName, lastName, email, id, urlPhoto } = element;
    const { data, error } = await supabase
      .from("exam_results")
      .select()
      .eq("id_module", idModule)
      .eq("id_student", id);

    if (error) throw new Error(error.message);

    grades.push({
      lastName,
      firstName,
      email: email!,
      urlPhoto: urlPhoto!,
      grade: data.length > 0 ? data[0].total_grade : 0,
      id: id!,
      state: data.length > 0 ? true : false,
    });
  }

  return grades;
};

export const getGradesByStudent = async (
  idStudent: string
): Promise<ModuleGrade[]> => {
  const grades: ModuleGrade[] = [];
  const { data, error } = await supabase
    .from("exam_results")
    .select(
      `
      graded_at,
      id_exam,
      total_grade,
      modules (
        id,
        module_number
      )
    `
    )
    .eq("id_student", idStudent);

  if (error) throw new Error(error.message);

  for (const element of data) {
    const { graded_at, id_exam, modules, total_grade } = element;

    grades.push({
      grade: total_grade,
      gradedAt: graded_at,
      idExam: id_exam,
      idModule: modules.id,
      module: modules.module_number,
    });
  }

  return grades;

};
