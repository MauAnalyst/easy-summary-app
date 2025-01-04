import { FastifyInstance } from "fastify";
import { QuestionUseCase } from "../usecases/question.usercase";
import { QuestionCreate } from "../interfaces/question.interface";

export async function questionsRoutes(fastify: FastifyInstance) {
  const questionUseCase = new QuestionUseCase();
  fastify.post<{ Body: QuestionCreate }>("/", async (req, reply) => {
    const { question, alternatives, summaryID } = req.body;
    //const userID = "6bc06d04-5d63-415a-b9b8-1f72880fd979"; //req.headers["userID"];

    try {
      const data = await questionUseCase.create({
        question,
        alternatives,
        summaryID,
      });

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
