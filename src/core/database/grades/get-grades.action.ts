import { supabase } from "../../../../supabase";
import type {
  ModuleGrade,
  StudentGradeModule,
} from "../../../interfaces/Grades";

export const getGradesByModule = async (
  idModule: number,
): Promise<StudentGradeModule[]> => {
  const grades: StudentGradeModule[] = [];

  
  
  const { data, error } = await supabase.rpc("get_students_by_grade_status", {
    module_id: idModule,
    // has_grade: true
  });
  
  console.log(data);
  
  
  if(error) throw new Error(error.message)

  for (const element of data) {
    grades.push({
      lastName: element.last_name,
      firstName: element.first_name,
      email: element.email,
      urlPhoto: element.url_photo,
      grade: element.grade_numeric,
      id: element.id,
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

    if (
      modules &&
      !Array.isArray(modules) &&
      "id" in modules &&
      "module_number" in modules
    ) {
      const mod = modules as { id: number; module_number: number };
      grades.push({
        grade: total_grade,
        gradedAt: graded_at,
        idExam: id_exam,
        idModule: mod.id,
        module: mod.module_number,
      });
    }
  }

  return grades;
};
