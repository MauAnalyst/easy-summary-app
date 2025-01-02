import { UserCreate, UserRepository } from "../interfaces/user.interface";
import { UserRepositoryPrima } from "../repositores/user.repository";

class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrima();
  }

  async create({ name, email }: UserCreate): Promise<User> {
    const result = await this.userRepository.create({ email, name });

    return result;
  }
}

export { UserUseCase };
