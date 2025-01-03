import {
  Summary,
  SummaryCreate,
  SummaryRepository,
} from "../interfaces/summarys.intercafe";

class SummaryRepositoryPrisma implements SummaryRepository {
  create(data: SummaryCreate): Promise<Summary> {}
}

export { SummaryRepositoryPrisma };
