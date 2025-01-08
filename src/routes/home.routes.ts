import { FastifyInstance } from "fastify";

export async function homeRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req, reply) => {
    return reply.sendFile("index.html");
  });
}
