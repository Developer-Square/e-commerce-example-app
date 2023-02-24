import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import { catchError } from '@/lib/error-handling';
import Tokens from '@/lib/tokens/tokens.services';
import { ForgotPasswordParams } from '@/lib/users/users.schema';

async function forgotPasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email } = ForgotPasswordParams.parse(req.body);
  const resetPasswordToken = await Tokens.generateResetPasswordToken(
    email
  );
  await emailServices.sendResetPasswordEmail(
    email,
    resetPasswordToken
  );
  res.status(httpStatus.NO_CONTENT).end();
}

export default catchError(forgotPasswordRoute);
