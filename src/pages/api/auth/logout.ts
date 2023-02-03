import type { NextApiRequest, NextApiResponse } from 'next';

import { removeTokenCookie } from '@/lib/auth/auth-cookies';
import catchAPIError from '@/lib/error-handling/catchAPIError';

async function logout(_req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res);
  res.writeHead(302, { Location: '/' });
  res.end();
}

export default catchAPIError(logout);
