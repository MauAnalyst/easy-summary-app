export interface User {
  id: string;
  refreshToken?: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  refreshToken?: string;
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRefreshToken {
  email: string;
  refreshToken: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  saveRefreshToken({
    email,
    refreshToken,
  }: UserRefreshToken): Promise<User | null>;
}
