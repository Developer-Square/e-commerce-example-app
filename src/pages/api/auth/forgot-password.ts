import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import catchAPIError from '@/lib/error-handling/catchAPIError';
import Tokens from '@/lib/tokens/tokens.services';

async function forgotPasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  const resetPasswordToken = await Tokens.generateResetPasswordToken(
    req.body.email
  );
  await emailServices.sendResetPasswordEmail(
    req.body.email,
    resetPasswordToken
  );
  res.status(httpStatus.NO_CONTENT).send({});
}

export default catchAPIError(forgotPasswordRoute);
