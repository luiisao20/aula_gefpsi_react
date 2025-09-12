import type {
  Student,
  StudentAnswer,
  StudentGrade,
} from "../../../interfaces/Students";
import type { GradesByQuestion } from "../../../views/generals/students/StudentExam";
import { supabase } from "../../../../supabase";

export const getAllStudents = async (): Promise<Student[]> => {
  const students: Student[] = [];

  const { data, error } = await supabase.rpc("get_all_user_info");

  if (error) throw new Error(error.message);

  for (const element of data) {
    students.push({
      biography: element.biography,
      email: element.email,
      firstName: element.first_name,
      id: element.id,
      lastName: element.last_name,
      urlPhoto: element.url_photo,
    });
  }
  return students;
};

export const searchStudents = async (value: string): Promise<Student[]> => {
  const students: Student[] = [];
  
  
  const { data, error } = await supabase.rpc("search_all_user_info", {
    search_text: value.toLowerCase(),
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    students.push({
      biography: element.biography,
      email: element.email,
      firstName: element.first_name,
      id: element.id,
      lastName: element.last_name,
      urlPhoto: element.url_photo,
    });
  }
  return students;
};

export const getStudent = async (idStudent: string): Promise<Student> => {
  const { data, error } = await supabase
    .rpc("get_user_info", {
      user_id: idStudent,
    })
    .single();

  if (error || typeof data !== "object") {
    throw new Error("No se encontró información del estudiante.");
  }

  const student: Student = {
    email: (data as any).email,
    firstName: (data as any).first_name,
    id: (data as any).id,
    lastName: (data as any).last_name,
    urlPhoto: (data as any).url_photo,
  };
  return student;
};

export const getExamByStudent = async (
  idStudent: string,
  idExam: string
): Promise<StudentAnswer[]> => {
  const studentAnswers: StudentAnswer[] = [];

  const { data, error } = await supabase.rpc("get_exam_by_student", {
    p_id_student: idStudent,
    p_id_exam: idExam,
  });

  if (error) throw new Error(error.message);

  for (const element of data) {
    studentAnswers.push({
      answer: element.answer,
      correct: element.correct,
      correctOption: element.correct_option,
      grade: element.grade,
      idQuestion: element.id_question,
      optionSelected: element.option_selected,
      question: element.question,
      questionType: element.type,
    });
  }

  return studentAnswers;
};

export const updateGradeQuestionsByStudent = async (
  idStudent: string,
  idExam: string,
  grades: GradesByQuestion[],
  totalGrade: number,
  update: boolean,
  idModule: string
) => {
  for (const { grade, idQuestion } of grades) {
    const { error } = await supabase
      .from("student_answers")
      .update({ grade })
      .eq("id_question", idQuestion)
      .eq("id_student", idStudent);

    if (error) console.log(error);
  }
  if (!update) {
    const { error } = await supabase.from("exam_results").insert({
      id_student: idStudent,
      id_exam: idExam,
      total_grade: totalGrade,
      id_module: idModule,
    });

    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("exam_reults")
      .update({ total_grade: totalGrade })
      .eq("id_exam", idExam)
      .eq("id_student", idStudent);

    if (error) throw new Error(error.message);
  }
};

export const getGradeByStudent = async (
  idStudent: string,
  idExam: string
): Promise<StudentGrade> => {
  const { data, error } = await supabase
    .from("exam_results")
    .select()
    .eq("id_exam", idExam)
    .eq("id_student", idStudent);

  if (error) throw new Error(error.message);

  const grade: StudentGrade = {
    comments: data[0].comments,
    idExam: data[0].id_exam,
    totalGrade: data[0].total_grade,
    gradedAt: data[0].graded_at,
    gradedBy: data[0].grade_by,
    idStudent: data[0].id_student,
  };
  return grade;
};
