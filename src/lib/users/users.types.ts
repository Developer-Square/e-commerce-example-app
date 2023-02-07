import type { IDBRecord } from '@/lib/definitions/IDBRecord';
import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '@/lib/definitions/query';

export interface IUser extends IDBRecord {
  name: string;
  role: UserRoles;
  email: string;
  isEmailVerified: boolean;
  password: string;
  salt: string;
}

export enum UserRoles {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

export type IUserWithID = Omit<IUser, '_id' | 'password' | 'salt'> & {
  id: string;
};

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
  confirmPassword(name: string, password: string): Promise<boolean>;
  findByName(name: string): Promise<IUser | null>;
  findByName(
    name: string,
    lean?: boolean
  ): Promise<IUserWithoutPassword | null>;
  findByEmail(email: string): Promise<IUser | null>;
  resetPassword(resetPasswordToken: any, newPassword: string): Promise<void>;
  verifyEmail(verifyEmailToken: any): Promise<IUserWithoutPassword>;
}
