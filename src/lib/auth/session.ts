import Iron from '@hapi/iron';
import type { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';

import envVariables from '../../config/envVariables';
import { getTokenCookie, MAX_AGE, setTokenCookie } from './cookies';

const TOKEN_SECRET = envVariables.auth.tokenSecret;

export async function setLoginSession(res: NextApiResponse, session: any) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getLoginSession(req: NextApiRequest) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  // eslint-disable-next-line consistent-return
  return session;
}

export const authenticate = (
  method: string | string[] | passport.Strategy,
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
