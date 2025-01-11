import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import {
  JwtPayload,
  UserCreate,
  UserLogin,
} from "../interfaces/user.interface";
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

      const login = await userUseCase.login({
        email,
        password,
      });

      const user = login[0];

      if (!user) throw new Error("user not found");

      const accessToken = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "15m" }
      );
      const refreshToken = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "7d" }
      );

      await userUseCase.saveToken({
        token: refreshToken,
        userID: user.id,
      });

      reply
        .setCookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // True para PRD
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 dias
        })
        .send({ user, accessToken });
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

  fastify.post("/refresh-token", async (req, reply) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) throw new Error("Refresh token is missing");

      const decoded = fastify.jwt.verify<JwtPayload>(refreshToken);
      const user = await userUseCase.getUser(decoded.id);
      if (!user) throw new Error("User not found");

      const storedToken = await userUseCase.getToken(user.id);
      if (storedToken?.token !== refreshToken) {
        throw new Error("Invalid or revoked refresh token");
      }

      const newAccessToken = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "15m" }
      );
      const newRefreshToken = fastify.jwt.sign(
        { email: user.email, id: user.id },
        { expiresIn: "7d" }
      );

      await userUseCase.saveToken({ token: newRefreshToken, userID: user.id });

      reply.setCookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 dias
      });

      // Retorna o novo access token
      return reply.send({ accessToken: newAccessToken });
    } catch (error) {
      return reply.status(401).send(error);
    }
  });
}
