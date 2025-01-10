export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserToken {
  id?: string;
  token: string;
  userID: string;
  createdAt?: Date;
}

export interface UserTokenCreate {
  token: string;
  userID: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  createToken({ token, userID }: UserTokenCreate): Promise<UserToken>;
  findByToken(userID: string): Promise<UserToken | null>;
  updateToken({ token, userID }: UserTokenCreate): Promise<UserToken>;
}
