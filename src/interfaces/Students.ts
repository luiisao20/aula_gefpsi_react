export interface Student {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  biography?: null;
  urlPhoto?: null;
  admin: boolean;
}

interface Option {
  id: number;
  option: string;
}

export interface ExamData {
  id: number;
  question: string;
  idType: number;
  options: Option[];
}

export interface StudentAnswer {
  idQuestion: number;
  question: string;
  answer: null | string;
  optionSelected: null | string;
  correct: number | null;
  correctOption: null | string;
  questionType: number;
  grade: number;
}
export interface StudentGrade {
  idStudent: number;
  idExam: number;
  totalGrade: number;
  gradedAt: Date;
  gradedBy: string | null;
  comments: string | null;
}
