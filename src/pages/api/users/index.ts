import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import type { IListOptions, IQueryOptions } from '@/lib/definitions/query';
import { emailServices } from '@/lib/email';
import { catchError } from '@/lib/error-handling';
import { Tokens } from '@/lib/tokens';
import { Users } from '@/lib/users';
import { UserCreateParams, UsersListQuery } from '@/lib/users/users.schema';
import type { IUser } from '@/lib/users/users.types';
import { formatSort, pick } from '@/lib/utils';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const params = UserCreateParams.parse(req.body);
    const user = await Users.create(params);
    if (!user) {
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong while saving your details. Please try again next time'
      );
    }
    const verifyEmailToken = await Tokens.generateVerifyEmailToken(user.email);
    await emailServices.sendSuccessfulRegistration(
      user.email,
      verifyEmailToken,
      user.name
    );
    res.status(httpStatus.CREATED).json(user);
  } else if (req.method === 'GET') {
    const params = UsersListQuery.parse(req.query);
    const { page, limit, sortBy }: IListOptions = params;
    const query = pick(params, ['name']) as IQueryOptions<IUser>;
    const sort = formatSort(sortBy);
    const users = await Users.list({ page, limit }, { sort, query });
    res.status(httpStatus.OK).json(users);
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}

export default catchError(handler);
