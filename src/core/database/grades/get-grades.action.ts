import { supabase } from "../../../../supabase";
import type {
  ModuleGrade,
  StudentGradeModule,
} from "../../../interfaces/Grades";

export const getGradesByModule = async (
  idModule: number,
  completed?: boolean,
  approven?: boolean
): Promise<StudentGradeModule[]> => {
  const grades: StudentGradeModule[] = [];

  const rpcParams: Record<string, any> = {
    module_id: idModule,
  };

  if (completed !== undefined) {
    rpcParams.has_grade = completed ? true : false;
  } else {
    rpcParams.has_grade = null;
  }

  if (approven !== undefined) {
    rpcParams.approven = approven ? true : false;
  } else {
    rpcParams.approven = null;
  }

  const { data, error } = await supabase.rpc(
    "get_students_by_grade_status",
    rpcParams
  );

  if (error) throw new Error(error.message);

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
    .rpc('get_students_grades', {user_id: idStudent})

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      grade: element.grade,
      gradedAt: element.date,
      idExam: element.id_exam,
      module: element.module,
      dueDate: element.due_date,
      reviewExam: element.review
    })
  }

  return grades;
};

export const getGradeByExam = async (
  idStudent: string,
  idExam: string
): Promise<number> => {
  const { count, error } = await supabase
    .from("exam_results")
    .select("id_student", { count: "exact", head: true })
    .eq("id_student", idStudent)
    .eq("id_exam", idExam);

  if (error) throw new Error(error.message);

  return count!;
};
