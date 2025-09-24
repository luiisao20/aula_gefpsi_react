export interface StudentGradeModule {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  state?: boolean;
  grade: number | string;
  urlPhoto: string;
}

export interface ModuleGrade {
  grade: number;
  module: number;
  idModule?: number;
  idExam: number;
  gradedAt: Date;
  dueDate?: Date;
  reviewExam?: boolean;
}

export interface ExamTaskGrades {
  examGrade: number;
  taskGrade: number | null;
}

export interface StudentAverage {
  idStudent: string;
  idModule: number;
  grade: number;
}
