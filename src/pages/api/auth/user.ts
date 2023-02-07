import type { NextApiRequest, NextApiResponse } from 'next';

import { getLoginSession } from '@/lib/auth/auth';
import Users from '@/lib/users/users.services';

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const session = await getLoginSession(req);
  const user = (session && (await Users.findByName(session.name))) ?? null;
  res.status(200).json({ user });
}
export default userRoute;
