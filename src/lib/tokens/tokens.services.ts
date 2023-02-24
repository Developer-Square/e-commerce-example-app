/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import type { Filter } from 'mongodb';
import { ApiError } from 'next/dist/server/api-utils'

import envVariables from '@/config/envVariables';

// eslint-disable-next-line import/no-cycle
import Users from '../users/users.services';
import type { IUser } from '../users/users.types';
import type { TokensRaw } from './tokens.model';
import { TokensModel } from './tokens.model';
import type {
  GenerateTokenParams,
  IToken,
  ITokenLean,
  ITokenService,
  VerifyTokenParams,
} from './tokens.types';
import { TokenTypes } from './tokens.types';

export class TokenService implements ITokenService {
  protected name = 'token';

  private model: TokensRaw = TokensModel;

  generateToken({ user, type, expires }: GenerateTokenParams): string {
    const payload = {
      sub: user,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, envVariables.jwt.secret);
  }

  async saveToken(
    params: Omit<ITokenLean, 'blacklisted'>
  ): Promise<IToken | null> {
    const result = await this.model.insertOne({
      ...params,
      blacklisted: false,
    });
    return this.model.findOneById(result.insertedId);
  }

  async verifyToken({ token, type }: VerifyTokenParams): Promise<IToken> {
    const payload = jwt.verify(token, envVariables.jwt.secret);
    if (typeof payload.sub !== 'string') {
      throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
    }
    const tokenDoc = await this.model.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    return tokenDoc;
  }

  async generateResetPasswordToken(email: IUser['email']): Promise<string> {
    const user = await Users.findByEmail(email);
    const expires = moment().add(
      envVariables.jwt.resetPasswordExpirationMinutes,
      'minutes'
    );
    const resetPasswordToken = this.generateToken({
      user: user._id,
      expires,
      type: TokenTypes.RESET_PASSWORD,
    });
    await this.saveToken({
      token: resetPasswordToken,
      user: user._id,
      expires,
      type: TokenTypes.RESET_PASSWORD,
    });
    return resetPasswordToken;
  }

  async generateVerifyEmailToken(email: IUser['email']): Promise<string> {
    const user = await Users.findByEmail(email);
    const expires = moment().add(
      envVariables.jwt.verifyEmailExpirationMinutes,
      'minutes'
    );
    const verifyEmailToken = this.generateToken({
      user: user._id,
      expires,
      type: TokenTypes.VERIFY_EMAIL,
    });
    await this.saveToken({
      token: verifyEmailToken,
      user: user._id,
      expires,
      type: TokenTypes.VERIFY_EMAIL,
    });
    return verifyEmailToken;
  }

  async deleteMany(query: Filter<IToken>): Promise<void> {
    await this.model.deleteMany(query);
  }
}

const Tokens = new TokenService();
export default Tokens;
