import { time } from "console";
import {
  User,
  UserCreate,
  UserLogin,
  UserRefreshToken,
  UserRepository,
} from "../interfaces/user.interface";
import { UserRepositoryPrima } from "../repositores/user.repository";
import bcrypt from "bcrypt";

class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrima();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);

    if (verifyIfUserExists) throw new Error("user already exists");

    password = bcrypt.hashSync(password, 10);

    const result = await this.userRepository.create({
      email,
      name,
      password,
    });

    return result;
  }

  async login({ email, password }: UserLogin): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("user not found");

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("wrong passowrd");

    return user;
  }

  async updateRefreshToken({
    email,
    refreshToken,
  }: UserRefreshToken): Promise<User> {
    const result = await this.userRepository.saveRefreshToken({
      email,
      refreshToken,
    });

    return result;
  }
}

export { UserUseCase };
