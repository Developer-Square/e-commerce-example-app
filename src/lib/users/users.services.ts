/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import crypto from 'crypto';
import httpStatus from 'http-status';
import type { FindOptions } from 'mongodb';
import { ApiError } from 'next/dist/server/api-utils';

import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';
// eslint-disable-next-line import/no-cycle
import Tokens from '../tokens/tokens.services';
import { TokenTypes } from '../tokens/tokens.types';
import type { UsersRaw } from './users.model';
import { UsersModel } from './users.model';
import type {
  IUser,
  IUserCreateParams,
  IUserLean,
  IUserService,
  IUserWithoutPassword,
} from './users.types';
import { UserRoles } from './users.types';

export class UserService implements IUserService {
  protected name = 'user';

  private model: UsersRaw = UsersModel;

  hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  async verifyPassword(
    name: string,
    password: string
  ): Promise<IUserWithoutPassword> {
    const user = await this.findByName(name);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    if (user.password !== this.hashPassword(password, user.salt))
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Username or password is wrong'
      );
    const userWithoutPassword = (await this.model.findOne(
      { name },
      { projection: { password: 0, salt: 0 } }
    )) as IUserWithoutPassword;
    return userWithoutPassword;
  }

  async confirmPassword(name: string, password: string): Promise<boolean> {
    const user = await this.findByName(name);
    if (user && user.password === this.hashPassword(password, user.salt))
      return true;
    return false;
  }

  async create(
    params: IUserCreateParams
  ): Promise<IUserWithoutPassword | null> {
    const salt = crypto.randomBytes(16).toString('hex');
    const result = await this.model.insertOne({
      ...params,
      isEmailVerified: false,
      password: this.hashPassword(params.password, salt),
      salt,
      role: UserRoles.BUYER,
    });
    return this.model.findOneById(result.insertedId, {
      projection: { password: 0, salt: 0 },
    });
  }

  async get(userId: string): Promise<IUserWithoutPassword> {
    const user = await this.model.findOneById(userId, {
      projection: { password: 0, salt: 0 },
    });
    if (!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user as IUserWithoutPassword;
  }

  async findByName(
    name: string,
    options?: FindOptions<IUser>
  ): Promise<IUser> {
    const user = await this.model.findOne({ name }, { ...options });
    if (!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ email });
    if (!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
  }

  async delete(userId: string): Promise<void> {
    await this.model.removeById(userId);
  }

  async update(
    userId: string,
    params: Partial<IUserLean>
  ): Promise<IUserWithoutPassword | null> {
    const query = { _id: userId };
    const updateInfo = params;
    if (params.password) {
      const salt = crypto.randomBytes(16).toString('hex');
      Object.assign(updateInfo, {
        ...params,
        password: this.hashPassword(params.password, salt),
        salt,
      });
    }
    const result = await this.model.updateOne(query, { $set: updateInfo });
    return this.model.findOneById(result.upsertedId.toHexString(), {
      projection: { password: 0, salt: 0 },
    });
  }

  async list(
    { page, limit }: IPaginationOptions = { page: 1, limit: 50 },
    { sort, query }: IQueryOptions<IUser> = { sort: {}, query: {} }
  ): Promise<IQueryResult<IUserWithoutPassword>> {
    const totalCount = await this.model.countDocuments({ ...query });
    const paginationCursor = this.model.find(
      { ...query },
      {
        ...(sort && { sort }),
        limit: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        projection: { password: 0, salt: 0 },
      }
    );
    return {
      documents: await paginationCursor.toArray(),
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages: Math.ceil(totalCount / Number(limit)),
    };
  }

  async resetPassword(
    resetPasswordToken: any,
    newPassword: string
  ): Promise<void> {
    try {
      const resetPasswordTokenDoc = await Tokens.verifyToken({
        token: resetPasswordToken,
        type: TokenTypes.RESET_PASSWORD,
      });
      const user = await this.get(resetPasswordTokenDoc.user);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }
      await this.update(user._id, { password: newPassword });
      await Tokens.deleteMany({
        user: user._id,
        type: TokenTypes.RESET_PASSWORD,
      });
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
    }
  }

  async verifyEmail(verifyEmailToken: any): Promise<IUserWithoutPassword> {
    try {
      const verifyEmailTokenDoc = await Tokens.verifyToken({
        token: verifyEmailToken,
        type: TokenTypes.VERIFY_EMAIL,
      });
      const user = await this.get(verifyEmailTokenDoc.user);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }
      await Tokens.deleteMany({
        user: user._id,
        type: TokenTypes.VERIFY_EMAIL,
      });
      const updatedUser = await this.update(user._id, {
        isEmailVerified: true,
      });
      return updatedUser as IUserWithoutPassword;
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
  }
}

const Users = new UserService();
export default Users;
