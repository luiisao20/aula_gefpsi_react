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

export interface StudentTask {
  firstName: string;
  lastName: string;
  urlPhoto: string;
  email: string;
  id: string;
  task: string;
  grade?: number;
  url?: string;
}
