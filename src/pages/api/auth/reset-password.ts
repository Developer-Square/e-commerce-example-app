import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { catchError } from '@/lib/error-handling';
import Users from '@/lib/users/users.services';

async function resetPasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  await Users.resetPassword(req.query['token'], req.body.password);
  res.status(httpStatus.NO_CONTENT).end();
}

export default catchError(resetPasswordRoute);
