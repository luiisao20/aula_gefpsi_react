export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  biography?: null;
  urlPhoto?: null;
  admin?: boolean;
}

export interface Option {
  id: number;
  option: string;
  isCorrect: boolean;
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
