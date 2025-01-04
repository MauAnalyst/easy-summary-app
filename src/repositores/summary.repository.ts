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
                alternativeTrue: question.alternativeTrue,
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
  async findAllSummarys(userID: string): Promise<Summary[]> {
    const result = await prisma.summarys.findMany({
      where: {
        userID,
      },
      include: {
        questions: true, // Inclua as questões na consulta
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
