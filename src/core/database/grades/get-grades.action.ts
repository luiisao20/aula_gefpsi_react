import { supabase } from "../../../../supabase";
import type {
  ExamTaskGrades,
  ModuleGrade,
  StudentAverage,
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
  const { data, error } = await supabase.rpc("get_students_grades", {
    user_id: idStudent,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    grades.push({
      grade: element.grade,
      gradedAt: element.date,
      idExam: element.id_exam,
      module: element.module,
      dueDate: element.due_date,
      reviewExam: element.review,
      idModule: element.id_module,
    });
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

export const getExamAndTaskGrades = async (
  idStudent: string,
  idModule: number
): Promise<ExamTaskGrades> => {
  const { data, error } = await supabase.rpc("get_exam_and_task_grades", {
    student_id: idStudent,
    module_id: idModule,
  });

  if (error) throw new Error(error.message);

  return {
    examGrade: data.exam,
    taskGrade: data.task,
  };
};

export const insertAverage = async (
  grade: number,
  idStudent: string,
  idModule: number
) => {
  const { error } = await supabase
    .from("averages")
    .insert({ id_user: idStudent, id_module: idModule, grade: grade });

  if (error) throw new Error(error.message);
};

export const getStudentAverage = async (
  idStudent: string,
  idModule: number
): Promise<StudentAverage | null> => {
  const { data, error } = await supabase
    .from("averages")
    .select()
    .eq("id_user", idStudent)
    .eq("id_module", idModule);

  if (error) throw new Error(error.message);

  if (data.length === 0) return null;

  return {
    grade: data[0].grade,
    idModule: data[0].id_module,
    idStudent: data[0].id_user,
  };
};

export const updateStudentAverage = async (
  grade: number,
  idStudent: string,
  idModule: number
) => {
  const { error } = await supabase
    .from("averages")
    .update({ grade: grade })
    .eq("id_user", idStudent)
    .eq("id_module", idModule);

  if (error) throw new Error(error.message);
};
