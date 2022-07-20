import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';
import catchAPIError from '@/lib/error-handling/catchAPIError';
import { UserService } from '@/lib/users/users.services';
import type { IUser } from '@/lib/users/users.types';

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const Users = new UserService();
  const user = await Users.verifyPassword(
    req.body.name as IUser['name'],
    req.body.password as IUser['password']
  );
  req.session.user = user;
  await req.session.save();
  res.status(httpStatus.OK).json(user);
}

export default withSessionRoute(catchAPIError(loginRoute));
