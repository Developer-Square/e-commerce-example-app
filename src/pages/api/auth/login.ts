import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';
import { catchError } from '@/lib/error-handling';
import { Users } from '@/lib/users';
import { LoginParams } from '@/lib/users/users.schema';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = LoginParams.parse(req.body);
  const user = await Users.verifyPassword(name, password);
  req.session.user = user;
  await req.session.save();
  res.status(httpStatus.OK).json(user);
}

export default withSessionRoute(catchError(login));
