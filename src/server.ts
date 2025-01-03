import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { summaryRoutes } from "./routes/summary,routes";

const app: FastifyInstance = fastify({ logger: true });

app.register(userRoutes, {
  prefix: "/users",
});

app.register(summaryRoutes, {
  prefix: "/summarys",
});

app.listen(
  {
    port: 1729,
  },
  () => {
    console.log("server is running on port 3100");
  }
);
