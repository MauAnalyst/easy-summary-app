import { prisma } from "../database/prisma-client";
import {
  Question,
  QuestionCreate,
  QuestionRepository,
} from "../interfaces/question.interface";

class QuestionRepositoryPrisma implements QuestionRepository {
  async create(data: QuestionCreate): Promise<Question> {
    const result = await prisma.questions.create({
      data: {
        question: data.question,
        alternatives: data.alternatives,
        alternativeTrue: data.alternativeTrue,
        summaryID: data.summaryID,
      },
    });

    return result;
  }
}

export { QuestionRepositoryPrisma };
