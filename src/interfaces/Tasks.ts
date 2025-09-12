export interface TaskForEnable {
  titleTask: number;
  moduleNumber: string;
  idTask: number;
}

export interface TaskEnabled {
  idStudent: string;
  idTask: number;
}

export interface Assignment {
  idStudent?: string;
  idTask?: number;
  createdAt?: string;
  gradedAt?: string;
  grade?: number;
  feedback?: string;
  url: string;
  fileName: string;
  path: string;
}
