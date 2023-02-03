import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { emailServices } from '@/lib/email';
import catchAPIError from '@/lib/error-handling/catchAPIError';
import Users from '@/lib/users/users.services';

async function verifyEmailRoute(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const user = await Users.verifyEmail(req.query['token']);
  await emailServices.sendAccountCreated(user.email, user.name);
  res.status(httpStatus.NO_CONTENT).send({});
}

export default catchAPIError(verifyEmailRoute);
