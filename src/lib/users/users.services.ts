import crypto from 'crypto';
import httpStatus from 'http-status';

import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';
import ApiError from '../error-handling/ApiError';
import type { UsersRaw } from './users.model';
import { UsersModel } from './users.model';
import type {
  IUser,
  IUserCreateParams,
  IUserLean,
  IUserService,
} from './users.types';

export class UserService implements IUserService {
  protected name = 'user';

  private model: Promise<UsersRaw> = UsersModel();

  // eslint-disable-next-line class-methods-use-this
  hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  async verifyPassword(name: string, password: string): Promise<IUser> {
    const user = await (await this.model).findOne({ name });
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    if (user.password !== this.hashPassword(password, user.salt))
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Username or password is wrong'
      );
    return user;
  }

  async create(params: IUserCreateParams): Promise<IUser | null> {
    const salt = crypto.randomBytes(16).toString('hex');
    const result = await (
      await this.model
    ).insertOne({
      ...params,
      isEmailVerified: false,
      password: this.hashPassword(params.password, salt),
      salt,
      role: 'user',
    });
    return (await this.model).findOneById(result.insertedId);
  }

  async getUser(userId: string): Promise<IUser | null> {
    return (await this.model).findOneById(userId);
  }

  async findByName(name: string): Promise<IUser | null> {
    return (await this.model).findOne({ name });
  }

  async delete(userId: string): Promise<void> {
    await (await this.model).removeById(userId);
  }

  async update(
    userId: string,
    params: Partial<IUserLean>
  ): Promise<IUser | null> {
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
    const result = await (
      await this.model
    ).updateOne(query, { $set: updateInfo });
    return (await this.model).findOneById(result.upsertedId.toHexString());
  }

  async list(
    { offset, count }: IPaginationOptions = { offset: 0, count: 50 },
    { sort, query }: IQueryOptions<IUser> = { sort: {}, query: {} }
  ): Promise<IQueryResult<IUser>> {
    const totalCount = await (await this.model).countDocuments({ ...query });
    const paginationCursor = (await this.model).find(
      { ...query },
      {
        ...(sort && { sort }),
        limit: count,
        skip: offset,
      }
    );
    return {
      documents: await paginationCursor.toArray(),
      page: offset,
      limit: count,
      totalCount,
      totalPages: Math.ceil(totalCount / count),
    };
  }
}
