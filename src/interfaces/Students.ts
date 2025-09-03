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
