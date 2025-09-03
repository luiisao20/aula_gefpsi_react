export interface StudentAnswer {
  idQuestion: number;
  question: string;
  answer: string | null;
  optionSelected: string | null;
  correct: boolean | null;
  correctOption: string | null;
}
