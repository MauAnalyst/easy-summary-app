import { FastifyInstance } from "fastify";
import { SummaryUseCase } from "../usecases/summary.usecase";
import { SummaryCreate } from "../interfaces/summarys.intercafe";

export async function summaryRoutes(fastify: FastifyInstance) {
  const summaryUseCase = new SummaryUseCase();
  fastify.post<{ Body: SummaryCreate }>("/", async (req, reply) => {
    const { subject, summary } = req.body;
    try {
      const data = await summaryUseCase.create({});

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });
}
