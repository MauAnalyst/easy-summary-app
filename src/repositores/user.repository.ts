import { prisma } from "../database/prisma-client";
import {
  User,
  UserCreate,
  UserRefreshToken,
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

  async saveRefreshToken({
    email,
    refreshToken,
  }: UserRefreshToken): Promise<User> {
    const result = await prisma.user.update({
      where: {
        email,
      },
      data: {
        refreshToken,
      },
    });

    return result;
  }
}

export { UserRepositoryPrima };
