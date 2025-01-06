import { FastifyInstance } from "fastify";

export async function homeRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req, reply) => {
    const data = {
      title: "Home",
      message: "Bem-vindo à página inicial!",
    };

    //console.log(data);

    reply.send(data);
    return reply.sendFile("index.html");
  });
}
