import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";

class UserRepositoryPrima implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return result;
  }
}

export { UserRepositoryPrima };
