import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

import type { IListOptions, IQueryOptions } from '@/lib/definitions/query';
import { emailServices } from '@/lib/email';
import { Tokens } from '@/lib/tokens';
import { Users } from '@/lib/users';
import type { IUser } from '@/lib/users/users.types';
import formatSort from '@/lib/utils/formatSort';
import pick from '@/lib/utils/pick';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await Users.create(req.body);
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
    const { offset, count, sortBy }: IListOptions = req.query;
    const query = pick(req.query, ['name']) as IQueryOptions<IUser>;
    const sort = formatSort(sortBy);
    const users = await Users.list({ offset, count }, { sort, query });
    res.status(httpStatus.OK).json(users);
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}
