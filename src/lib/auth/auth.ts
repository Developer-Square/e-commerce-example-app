import Iron from '@hapi/iron';
import type { NextApiRequest, NextApiResponse } from 'next';

import envVariables from '@/config/envVariables';

import { getTokenCookie, MAX_AGE, setTokenCookie } from './auth-cookies';

export async function setLoginSession(res: NextApiResponse, session: any) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(
    obj,
    envVariables.auth.tokenSecret,
    Iron.defaults
  );

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(
    token,
    envVariables.auth.tokenSecret,
    Iron.defaults
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  // eslint-disable-next-line consistent-return
  return session;
}
