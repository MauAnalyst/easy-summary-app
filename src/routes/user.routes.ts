import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate } from "../interfaces/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const data = await userUseCase.create({
        name,
        email,
        password,
      });

      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/", (req, reply) => {
    reply.send("hellow word");
  });
}
