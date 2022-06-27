import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import catchAPIError from '@/lib/error-handling/catchAPIError';

import { UserService } from '../../lib/users/users.services';
import type { IUserCreateParams } from '../../lib/users/users.types';

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const Users = new UserService();
  const user = await Users.create(req.body as IUserCreateParams);
  res.status(httpStatus.CREATED).json(user);
}

export default catchAPIError(registerRoute);
