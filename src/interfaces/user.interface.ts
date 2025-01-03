export interface User {
  id: String;
  name: String;
  email: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
