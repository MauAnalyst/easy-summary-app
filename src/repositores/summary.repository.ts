import { prisma } from "../database/prisma-client";
import {
  Summary,
  SummaryCreate,
  SummaryRepository,
} from "../interfaces/summary.intercafe";

class SummaryRepositoryPrisma implements SummaryRepository {
  async create(data: SummaryCreate): Promise<Summary> {
    const result = await prisma.summarys.create({
      data: {
        subject: data.subject,
        textarea: data.textarea,
        userID: data.userID,
        questions: data.questions
          ? {
              create: data.questions.map((question) => ({
                question: question.question,
                alternatives: question.alternatives,
              })),
            }
          : undefined,
      },
      include: {
        questions: true, // Inclui as perguntas no retorno
      },
    });

    return result;
  }
  // async findBySummary(userID: string): Promise<Summary | null> {
  //   const result = await prisma.summarys.findFirst({
  //     where: {
  //       userID,
  //     },
  //   });

  //   return result || null;
  // }
}

export { SummaryRepositoryPrisma };
