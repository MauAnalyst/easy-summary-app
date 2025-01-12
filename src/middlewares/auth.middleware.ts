import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.cookies.accessToken;

    if (!token) {
      throw new Error("Access token missing");
    }

    const decoded = request.server.jwt.verify(token);

    request.user = decoded;
  } catch (error) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new Error("Refresh token missing");
    }

    const decoded = request.server.jwt.verify(refreshToken);

    if (!decoded) {
      throw new Error("Refresh token inválido");
    }

    request.user = decoded;
  }
}
