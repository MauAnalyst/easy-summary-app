import { error } from "console";
import { User, UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrima } from "../repositores/user.repository";

class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrima();
  }

  async create({ name, email }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);

    if (verifyIfUserExists) {
      throw new Error("user already exists");
    }

    const result = await this.userRepository.create({ email, name });

    return result;
  }
}

export { UserUseCase };
