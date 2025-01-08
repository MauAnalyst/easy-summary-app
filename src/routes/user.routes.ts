import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate, UserLogin } from "../interfaces/user.interface";
import { authenticate } from "../middlewares/auth.middleware";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/create", async (req, reply) => {
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

  fastify.post<{ Body: UserLogin }>("/login", async (req, reply) => {
    const { email, password } = req.body;

    try {
      const user = await userUseCase.login({
        email,
        password,
      });
      const token = fastify.jwt.sign({ email: user.email, id: user.id });

      return token;
    } catch (error) {}
  });

  fastify.get(
    "/protected",
    { preHandler: [authenticate] },
    async (req, reply) => {
      return { data: "You have access to protected data!" };
    }
  );
}
