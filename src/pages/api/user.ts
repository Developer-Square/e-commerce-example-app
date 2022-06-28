import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getLoginSession } from '@/lib/auth/session';
import { UserService } from '@/lib/users/users.services';

import catchAPIError from '../../lib/error-handling/catchAPIError';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const Users = new UserService();
  const session = await getLoginSession(req);
  const user = (session && (await Users.findByName(session.name))) ?? null;
  res.status(httpStatus.OK).json({ user });
}
export default catchAPIError(userRoute);
