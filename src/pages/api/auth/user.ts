import type { NextApiRequest, NextApiResponse } from 'next';

import { withSessionRoute } from '@/lib/auth/withSession';
import { catchError } from '@/lib/error-handling';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  res.status(200).json(user);
}
export default withSessionRoute(catchError(userRoute));
