import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    console.log(request);
    await request.jwtVerify();
  } catch (error) {
    reply.send(error);
  }
}
