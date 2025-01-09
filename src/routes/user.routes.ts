import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { UserCreate, UserLogin } from "../interfaces/user.interface";
import { authenticate } from "../middlewares/auth.middleware";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/create", async (req, reply) => {
    try {
      const validatedData = userSchema.parse(req.body);
      const { name, email, password } = validatedData;

      const result = await userUseCase.create({
        name,
        email,
        password,
      });

      return reply.send(result);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post<{ Body: UserLogin }>("/login", async (req, reply) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      const { email, password } = validatedData;

      const user = await userUseCase.login({
        email,
        password,
      });

      const token = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "15m" }
      );
      const refreshToken = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "7d" }
      );

      await userUseCase.updateRefreshToken({
        email,
        refreshToken,
      });

      return token;
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get(
    "/protected",
    { preHandler: [authenticate] },
    async (req, reply) => {
      return { data: "You have access to protected data!" };
    }
  );
}
