import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import { catchError } from '@/lib/error-handling';
import Users from '@/lib/users/users.services';

async function verifyEmailRoute(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const user = await Users.verifyEmail(req.query['token']);
  await emailServices.sendAccountCreated(user.email, user.name);
  res.status(httpStatus.NO_CONTENT).end();
}

export default catchError(verifyEmailRoute);
