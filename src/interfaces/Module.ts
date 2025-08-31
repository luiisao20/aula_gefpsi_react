export interface Module {
  id?: number;
  title: string;
  number: number;
  professor: string;
  subject: string;
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
