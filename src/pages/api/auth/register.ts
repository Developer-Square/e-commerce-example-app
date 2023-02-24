/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils'

import { withSessionRoute } from '@/lib/auth/withSession';
import { emailServices } from '@/lib/email';
import { catchError } from '@/lib/error-handling';
import Tokens from '@/lib/tokens/tokens.services';
import { UserCreateParams } from '@/lib/users/users.schema';
import Users from '@/lib/users/users.services';

async function register(req: NextApiRequest, res: NextApiResponse) {
  const params = UserCreateParams.parse(req.body);
  const user = await Users.create(params);
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

export default withSessionRoute(catchError(register));
