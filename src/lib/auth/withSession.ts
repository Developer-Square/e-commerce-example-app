import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

import envVariables from '@/config/envVariables';

import type { IUserWithoutPassword } from '../users/users.types';

declare module 'iron-session' {
  interface IronSessionData {
    user?: IUserWithoutPassword;
  }
}

const sessionOptions = {
  password: envVariables.auth.password,
  cookieName: 'e-commerce-app-cookies',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    maxAge: envVariables.auth.cookieOptions.maxAge,
    expires: new Date(
      Date.now() + envVariables.auth.cookieOptions.maxAge * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
