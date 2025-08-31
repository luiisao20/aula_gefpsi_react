export interface Module {
  id?: number;
  title: string;
  number: number;
  professor: string;
  subject: string;
  status?: boolean;
}

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

export interface Task {
  id?: number;
  title: string;
  dueDate: Date;
  instructions: string;
  publishedDate: Date;
  idModule: string;
  status?: boolean;
}