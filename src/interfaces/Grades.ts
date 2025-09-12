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
