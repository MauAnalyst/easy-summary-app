import fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import path from "path";
import fastifyJwt from "@fastify/jwt";
import { userRoutes } from "./routes/user.routes";
import { summaryRoutes } from "./routes/summary.routes";
import { questionsRoutes } from "./routes/question.routes";
import { homeRoutes } from "./routes/home.routes";

dotenv.config();

// Definir __dirname
const __dirname = process.cwd();

const app: FastifyInstance = fastify({ logger: true });

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "defaultsecret", // Use uma variável de ambiente para maior segurança
});

app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

app.register(userRoutes, {
  prefix: "/users",
});

app.register(homeRoutes, {
  prefix: "/",
});

app.register(summaryRoutes, {
  prefix: "/summarys",
});

app.register(questionsRoutes, {
  prefix: "/questions",
});

app.listen(
  {
    port: 1729,
  },
  () => {
    console.log("server is running on port 1729");
  }
);
