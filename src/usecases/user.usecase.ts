import {
  User,
  UserCreate,
  UserToken,
  UserLogin,
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

  async getUser(email: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);

    return user || null;
  }

  async login({
    email,
    password,
  }: UserLogin): Promise<[User | null, UserToken | null]> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("user not found");

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("wrong passowrd");

    let checkToken = await this.userRepository.findByToken(user.id);

    if (!checkToken) {
      checkToken = await this.userRepository.createToken({
        token: "",
        userID: user.id,
      });
    }

    return [user, checkToken];
  }

  async saveToken({ token, userID }: UserToken): Promise<UserToken | null> {
    const userToken = await this.userRepository.updateToken({
      token,
      userID,
    });

    return userToken;
  }

  async getToken(userID: string): Promise<UserToken | null> {
    const userToken = await this.userRepository.findByToken(userID);

    return userToken || null;
  }
}

export { UserUseCase };
