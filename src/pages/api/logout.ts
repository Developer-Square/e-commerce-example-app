import type { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from '@/lib/auth/cookies';
import catchAPIError from '@/lib/error-handling/catchAPIError';

async function logoutRoute(_req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' }).end();
}

export default catchAPIError(logoutRoute);
