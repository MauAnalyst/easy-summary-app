import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.cookies.accessToken;

    if (!token) {
      console.log("Access token missing");
      throw new Error("Unauthorized");
    }

    const decoded = request.server.jwt.verify(token);

    request.user = decoded;
  } catch (error) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      console.log("Refresh token missing");
      throw new Error("Unauthorized");
    }

    const decoded = request.server.jwt.verify(refreshToken);

    if (!decoded) {
      throw new Error("Refresh token inválido");
    }

    request.user = decoded;
  }
}
