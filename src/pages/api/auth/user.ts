import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  res.status(200).json(user);
}
export default withSessionRoute(userRoute);
