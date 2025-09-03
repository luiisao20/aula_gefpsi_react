export interface Module {
  id?: number;
  title: string;
  number: number;
  professor: string;
  subject?: string; // Eliminar
  status?: boolean;
}

// Eliminar objetivos
export interface Objective {
  id?: number;
  description: string;
  idModule: number;
}

export interface Content {
  id?: number;
  topic: string;
  idModule: number;
}

export interface Bibliography {
  id?: number;
  reference: string;
  idModule: number;
}

export interface VideoConference {
  id?: number;
  url: string;
  idModule: number;
}

export interface ExtraContent {
  id?: number;
  url: string;
  description: string;
  idModule?: number;
}

export interface Task {
  id?: number;
  title: string;
  dueDate: Date;
  instructions: string;
  publishedDate: Date;
  idModule: string;
  status?: boolean;
}

export interface Exam {
  id?: number;
  idModule?: number;
  dueDate?: Date;
  status?: boolean;
}

export interface ExamType {
  id: number;
  type: string;
}

export interface Question {
  id?: number;
  text: string;
  idExam: number;
  idType: number;
}

export interface Option {
  id?: number;
  text: string;
  isCorrect: boolean;
  idQuestion?: string;
}

export interface QuestionWithOptions extends Question {
  options: Option[];
}
