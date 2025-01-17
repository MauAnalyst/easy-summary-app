import {
  SummaryCreate,
  SummaryRepository,
} from "../interfaces/summary.intercafe";
import { UserRepository } from "../interfaces/user.interface";
import { SummaryRepositoryPrisma } from "../repositores/summary.repository";
import { UserRepositoryPrima } from "../repositores/user.repository";

class SummaryUseCase {
  private summaryRepository: SummaryRepository;
  private userRepository: UserRepository;
  constructor() {
    this.summaryRepository = new SummaryRepositoryPrisma();
    this.userRepository = new UserRepositoryPrima();
  }

  async create({ subject, textarea, userID }: SummaryCreate) {
    //const user = await this.userRepository.findByEmail(userID);
    const summary = await this.summaryRepository.create({
      subject,
      textarea,
      userID,
    });

    return summary;
  }

  async listenAllSumamarys(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const summarys = await this.summaryRepository.findAllSummarys(user.id);

    return summarys;
  }
}

export { SummaryUseCase };
