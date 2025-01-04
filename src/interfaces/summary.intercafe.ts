import { Question } from "./question.interface";

export interface Summary {
  id: string;
  subject: string;
  textarea: string;
  questions: Question[];
  userID: string;
}

export interface SummaryCreate {
  subject: string;
  textarea: string;
  userID: string;
  questions?: Omit<Question, "id" | "summaryID">[];
}

export interface SummaryRepository {
  create(data: SummaryCreate): Promise<Summary>;
  //findBySummary(summary: String): Promise<Summary | null>;
}
