/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import ApiError from '@/lib/error-handling/ApiError';
import Tokens from '@/lib/tokens/tokens.services';

async function sendVerificationEmailRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.session;
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please login first');
  }
  const verifyEmailToken = await Tokens.generateVerifyEmailToken(user.email);
  await emailServices.sendVerificationEmail(
    user.email,
    verifyEmailToken,
    user.name
  );
  res.status(httpStatus.NO_CONTENT).send({});
}

export default sendVerificationEmailRoute;
