export interface Question {
  id: string;
  question: string;
  alternatives: string[];
  alternativeTrue: string;
  summaryID: string;
}

export interface QuestionCreate {
  question: string;
  alternatives: string[];
  alternativeTrue: string;
  summaryID: string;
}

export interface QuestionRepository {
  create(data: QuestionCreate): Promise<Question>;
}
