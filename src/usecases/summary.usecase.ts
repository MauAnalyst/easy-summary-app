import {
  SummaryCreate,
  SummaryRepository,
} from "../interfaces/summarys.intercafe";
import { SummaryRepositoryPrisma } from "../repositores/summary.respository";

class SummaryUseCase {
  private summaryRepository: SummaryRepository;
  constructor() {
    this.summaryRepository = new SummaryRepositoryPrisma();
  }

  async create({ subject, summary, questions }: SummaryCreate) {}
}

export { SummaryUseCase };
