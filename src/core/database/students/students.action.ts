import type {AxiosResponse} from "axios";
import api from "../../../../api";
import type {
  Student,
  StudentAnswer,
  StudentGrade,
} from "../../../interfaces/Students";
import type { GradesByQuestion } from "../../../views/generals/students/StudentExam";

export const getAllStudents = async (): Promise<Student[]> => {
  const students: Student[] = [];
  try {
    const res = await api.get("/students");

    for (const element of res.data) {
      students.push({
        admin: element.admin,
        biography: element.bioggraphy,
        email: element.email,
        firstName: element.first_name,
        id: element.id,
        lastName: element.last_name,
        urlPhoto: element.url_photo,
      });
    }
    return students;
  } catch (error) {
    throw error;
  }
};

export const getStudent = async (idStudent: string): Promise<Student> => {
  try {
    const res = await api.get(`/students/${idStudent}`);
    const student: Student = {
      admin: res.data.admin,
      biography: res.data.bioggraphy,
      email: res.data.email,
      firstName: res.data.first_name,
      id: res.data.id,
      lastName: res.data.last_name,
      urlPhoto: res.data.url_photo,
    };

    return student;
  } catch (error) {
    throw error;
  }
};

export const getExamByStudent = async (
  idStudent: string,
  idExam: string
): Promise<StudentAnswer[]> => {
  try {
    const res = await api.get(
      `/students/exam/student?idStudent=${idStudent}&idExam=${idExam}`
    );
    const result: StudentAnswer[] = res.data;
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateGradeQuestionsByStudent = async (
  idStudent: string,
  idExam: string,
  grades: GradesByQuestion[],
  totalGrade: number,
  update: boolean
) => {
  try {
    const res = await api.put(
      `/students/exam/student/${idStudent}/exam/${idExam}`,
      { grades, totalGrade, update }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getGradeByStudent = async (
  idStudent: string,
  idExam: string
): Promise<StudentGrade> => {
  try {
    const res: AxiosResponse = await api.get(
      `/students/exam/result/student/${idStudent}/exam/${idExam}`
    );
    const grade: StudentGrade = {
      comments: res.data.comments,
      idExam: res.data.id_exam,
      totalGrade: res.data.total_grade,
      gradedAt: res.data.grade_at,
      gradedBy: res.data.grade_by,
      idStudent: res.data.id_student,
    };
    return grade;
  } catch (error) {
    throw error;
  }
};
