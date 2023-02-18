import httpStatus from 'http-status';
import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';

async function logout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.status(httpStatus.NO_CONTENT).end();
}

export default withSessionRoute(logout);
