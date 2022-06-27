import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';

import { authenticate, setLoginSession } from '@/lib/auth/session';
import LocalStrategy from '@/lib/auth/strategy';
import catchAPIError from '@/lib/error-handling/catchAPIError';
import type { IUser } from '@/lib/users/users.types';

passport.use(LocalStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(
    catchAPIError(async (req: NextApiRequest, res: NextApiResponse) => {
      const user = await authenticate('local', req, res);
      const session = { ...(user as IUser) };

      await setLoginSession(res, session);

      res.status(200);
    })
  );
