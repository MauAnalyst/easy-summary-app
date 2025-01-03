export interface Question {
  id: string;
  question: string;
  alternatives: string[];
  summaryID: string;
}

export interface Summary {
  id: string;
  subject: string;
  summary: string;
  questions: Question[];
  userID: string;
}

export interface SummaryCreate {
  subject: string;
  summary: string;
  questions: Omit<Question, "id" | "summaryID">[];
}

export interface SummaryRepository {
  create(data: SummaryCreate): Promise<Summary>;
}
