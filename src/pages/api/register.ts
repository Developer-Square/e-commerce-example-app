import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';
import ApiError from '@/lib/error-handling/ApiError';
import catchAPIError from '@/lib/error-handling/catchAPIError';

import { UserService } from '../../lib/users/users.services';
import type { IUserCreateParams } from '../../lib/users/users.types';

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  const Users = new UserService();
  const user = await Users.create(req.body as IUserCreateParams);
  if (!user) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while saving your details. Please try again next time'
    );
  }
  req.session.user = user;
  await req.session.save();
  res.status(httpStatus.CREATED).json(user);
}

export default withSessionRoute(catchAPIError(registerRoute));
