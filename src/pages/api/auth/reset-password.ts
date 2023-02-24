import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { catchError } from '@/lib/error-handling';
import { ResetPasswordParams, ResetPasswordQuery } from '@/lib/users/users.schema';
import Users from '@/lib/users/users.services';

async function resetPasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token } = ResetPasswordQuery.parse(req.query);
  const { password } = ResetPasswordParams.parse(req.body);
  await Users.resetPassword(token, password);
  res.status(httpStatus.NO_CONTENT).end();
}

export default catchError(resetPasswordRoute);
