import type { JwtPayload } from 'jsonwebtoken';
import type { Moment } from 'moment';
import type { Filter } from 'mongodb';

import type { IDBRecord } from '../definitions/IDBRecord';
import type { IUser } from '../users/users.types';

export interface IToken extends IDBRecord {
  token: string;
  user: string;
  type: TokenTypes;
  expires: Moment;
  blacklisted: boolean;
}

export type ITokenLean = Omit<IToken, '_id' | '_updatedAt' | '_createdAt'>;

export interface IPayload extends JwtPayload {
  sub: IToken['user'];
  iat: number;
  exp: number;
  type: IToken['type'];
}

export type GenerateTokenParams = Pick<IToken, 'user' | 'type'> & {
  expires: Moment;
};

export type VerifyTokenParams = Pick<IToken, 'token' | 'type'>;

export enum TokenTypes {
  RESET_PASSWORD = 'resetPassword',
  VERIFY_EMAIL = 'verifyEmail',
}

export interface ITokenService {
  generateToken(params: GenerateTokenParams): string;
  saveToken(params: Omit<ITokenLean, 'blacklisted'>): Promise<IToken | null>;
  verifyToken(params: VerifyTokenParams): Promise<IToken>;
  generateResetPasswordToken(email: IUser['email']): Promise<string>;
  generateVerifyEmailToken(email: IUser['email']): Promise<string>;
  deleteMany(query: Filter<IToken>): Promise<void>;
}
