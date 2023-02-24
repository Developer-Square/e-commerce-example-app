import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import { catchError } from '@/lib/error-handling';
import { VerifyEmailQuery } from '@/lib/users/users.schema';
import Users from '@/lib/users/users.services';

async function verifyEmailRoute(req: NextApiRequest, res: NextApiResponse) {
  const { token } = VerifyEmailQuery.parse(req.query);
  const user = await Users.verifyEmail(token);
  await emailServices.sendAccountCreated(user.email, user.name);
  res.status(httpStatus.NO_CONTENT).end();
}

export default catchError(verifyEmailRoute);
