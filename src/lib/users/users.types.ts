import type { IDBRecord } from '@/lib/definitions/IDBRecord';
import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '@/lib/definitions/query';

export interface IUser extends IDBRecord {
  name: string;
  role: 'admin' | 'user';
  email: string;
  isEmailVerified: boolean;
  password: string;
  salt: string;
}

export type IUserLean = Omit<
  IUser,
  '_id' | '_updatedAt' | '_createdAt' | 'salt'
>;

export type IUserWithoutPassword = Omit<IUser, 'password' | 'salt'>;

export type IUserCreateParams = Omit<IUserLean, 'isEmailVerified' | 'role'>;

export type IValidatePasswordData = { password: string } & (
  | { name: string; email: never }
  | { email: string; name: never }
);

export interface IUserService {
  create(params: IUserCreateParams): Promise<IUserWithoutPassword | null>;
  list(
    paginationOptions?: IPaginationOptions,
    queryOptions?: IQueryOptions<IUser>
  ): Promise<IQueryResult<IUserWithoutPassword>>;
  update(
    userId: string,
    params: Partial<IUserLean>
  ): Promise<IUserWithoutPassword | null>;
  delete(userId: string): Promise<void>;
  getUser(userId: string): Promise<IUserWithoutPassword | null>;
  hashPassword(password: string, salt: string): string;
  verifyPassword(name: string, password: string): Promise<IUserWithoutPassword>;
  findByName(name: string): Promise<IUser | null>;
}
