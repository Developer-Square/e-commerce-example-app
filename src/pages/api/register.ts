import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import ApiError from '@/lib/error-handling/ApiError';
import catchAPIError from '@/lib/error-handling/catchAPIError';
import Users from '@/lib/users/users.services';
import type { IUserCreateParams } from '@/lib/users/users.types';

async function register(req: NextApiRequest, res: NextApiResponse) {
  const user = await Users.create(req.body as IUserCreateParams);
  if (!user) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong while saving your details. Please try again next time'
    );
  }
  res.status(httpStatus.CREATED).json(user);
}

export default catchAPIError(register);
