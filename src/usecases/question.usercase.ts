import {
  QuestionCreate,
  QuestionRepository,
} from "../interfaces/question.interface";
import { SummaryRepository } from "../interfaces/summary.intercafe";
import { QuestionRepositoryPrisma } from "../repositores/question.repository";
import { SummaryRepositoryPrisma } from "../repositores/summary.repository";

class QuestionUseCase {
  private summaryRepository: SummaryRepository;
  private questionRepository: QuestionRepository;
  constructor() {
    this.summaryRepository = new SummaryRepositoryPrisma();
    this.questionRepository = new QuestionRepositoryPrisma();
  }

  async create({ question, alternatives, summaryID }: QuestionCreate) {
    const questions = await this.questionRepository.create({
      question,
      alternatives,
      summaryID,
    });

    return questions;
  }
}

export { QuestionUseCase };
