import { prisma } from "../database/prisma-client";
import {
  User,
  UserCreate,
  UserToken,
  UserTokenCreate,
  UserRepository,
} from "../interfaces/user.interface";

class UserRepositoryPrima implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return result || null;
  }

  async createToken(data: UserTokenCreate): Promise<UserToken> {
    const result = await prisma.refreshToken.create({
      data: {
        token: data.token,
        userID: data.userID,
      },
    });

    return result;
  }

  async findByToken(userID: string): Promise<UserToken | null> {
    const result = await prisma.refreshToken.findFirst({
      where: {
        userID,
      },
    });

    return result || null;
  }

  async updateToken({ token, userID }: UserTokenCreate): Promise<UserToken> {
    const result = await prisma.refreshToken.update({
      where: {
        userID,
      },
      data: {
        token,
      },
    });

    return result;
  }
}

export { UserRepositoryPrima };
