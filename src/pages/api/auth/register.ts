/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';
import { emailServices } from '@/lib/email';
import ApiError from '@/lib/error-handling/ApiError';
import Tokens from '@/lib/tokens/tokens.services';
import Users from '@/lib/users/users.services';
import type { IUserCreateParams } from '@/lib/users/users.types';

async function register(req: NextApiRequest, res: NextApiResponse) {
  const user = await Users.create(req.body as IUserCreateParams);
  if (!user) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while saving your details. Please try again next time'
    );
  }
  const verifyEmailToken = await Tokens.generateVerifyEmailToken(user.email);
  await emailServices.sendSuccessfulRegistration(
    user.email,
    verifyEmailToken,
    user.name
  );
  req.session.user = user;
  await req.session.save();
  res.status(httpStatus.CREATED).json(user);
}

export default withSessionRoute(register);
