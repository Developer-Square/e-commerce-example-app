/* eslint-disable no-underscore-dangle */
import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getLoginSession } from '@/lib/auth/auth';
import { emailServices } from '@/lib/email';
import ApiError from '@/lib/error-handling/ApiError';
import Tokens from '@/lib/tokens/tokens.services';

async function sendVerificationEmailRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getLoginSession(req);
  if (!session) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please login first');
  }
  const verifyEmailToken = await Tokens.generateVerifyEmailToken(session.email);
  await emailServices.sendVerificationEmail(
    session.email,
    verifyEmailToken,
    session.name
  );
  res.status(httpStatus.NO_CONTENT).send({});
}

export default sendVerificationEmailRoute;
