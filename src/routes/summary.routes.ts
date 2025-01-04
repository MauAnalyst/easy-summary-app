import { FastifyInstance } from "fastify";
import { SummaryUseCase } from "../usecases/summary.usecase";
import { SummaryCreate } from "../interfaces/summary.intercafe";
import { userRoutes } from "./user.routes";

export async function summaryRoutes(fastify: FastifyInstance) {
  const summaryUseCase = new SummaryUseCase();
  fastify.post<{ Body: SummaryCreate }>("/", async (req, reply) => {
    const { subject, textarea } = req.body;
    const userID = "6bc06d04-5d63-415a-b9b8-1f72880fd979"; //req.headers["userID"];

    try {
      const data = await summaryUseCase.create({
        subject,
        textarea,
        userID,
      });

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.get("/", async (req, reply) => {
    const email = "mauricio@gmail.com";
    try {
      const data = await summaryUseCase.listenAllSumamarys(email);

      return data;
    } catch (error) {
      reply.send(error);
    }
  });
}
