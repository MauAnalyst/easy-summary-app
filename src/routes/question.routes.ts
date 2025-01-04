import { FastifyInstance } from "fastify";
import { QuestionUseCase } from "../usecases/question.usercase";
import { QuestionCreate } from "../interfaces/question.interface";

export async function questionsRoutes(fastify: FastifyInstance) {
  const questionUseCase = new QuestionUseCase();
  fastify.post<{ Body: QuestionCreate }>("/", async (req, reply) => {
    const { question, alternatives, summaryID, alternativeTrue } = req.body;

    try {
      const data = await questionUseCase.create({
        question,
        alternatives,
        alternativeTrue,
        summaryID,
      });

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
