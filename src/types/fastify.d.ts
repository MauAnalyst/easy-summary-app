import "@fastify/cookie";

declare module "fastify" {
  interface FastifyReply {
    setCookie(
      name: string,
      value: string,
      options?: import("@fastify/cookie").FastifyCookieOptions
    ): this;
    clearCookie(
      name: string,
      options?: import("@fastify/cookie").FastifyCookieOptions
    ): this;
  }
}
