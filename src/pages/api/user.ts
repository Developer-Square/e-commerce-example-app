import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';

import catchAPIError from '../../lib/error-handling/catchAPIError';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  res.send({ user: req.session.user });
}
export default withSessionRoute(catchAPIError(userRoute));
