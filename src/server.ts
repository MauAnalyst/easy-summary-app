import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { summaryRoutes } from "./routes/summary.routes";
import { questionsRoutes } from "./routes/question.routes";

const app: FastifyInstance = fastify({ logger: true });

app.register(userRoutes, {
  prefix: "/users",
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
    console.log("server is running on port 3100");
  }
);
