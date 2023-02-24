import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { catchError } from '@/lib/error-handling';
import { Users } from '@/lib/users';
import { UsersRouteQuery, UserUpdateParams } from '@/lib/users/users.schema';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = UsersRouteQuery.parse(req.query);
  if (req.method === 'GET') {
    const user = await Users.get(userId as string);
    res.status(httpStatus.OK).json(user);
  } else if (req.method === 'PATCH') {
    UserUpdateParams.parse(req.body);
    const user = await Users.update(userId as string, req.body);
    res.status(httpStatus.OK).json(user);
  } else if (req.method === 'DELETE') {
    await Users.delete(userId as string);
    res.status(httpStatus.OK).send({});
  } else {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ message: 'The API Route does not exist' });
  }
}

export default catchError(handler);
