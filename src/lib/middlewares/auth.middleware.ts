import { getIronSession } from 'iron-session/edge';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import sessionOptions from '../auth/session.options';
import { UserRoles } from '../users/users.types';
import type { MiddlewareFactory } from './types';

const authHandler: MiddlewareFactory = (_next) => {
  return async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const res: NextResponse = NextResponse.next();
    const signinUrl = new URL(`/signin`, req.url);
    const forbidden = new URL(`/403`, req.url);
    if (pathname.includes('/seller') || pathname.includes('/admin')) {
      const session = await getIronSession(req, res, sessionOptions);
      const { user } = session;
      if (!user) {
        return NextResponse.rewrite(signinUrl);
      }
      switch (user.role) {
        case undefined:
          return NextResponse.rewrite(signinUrl);
        case UserRoles.BUYER:
          return NextResponse.rewrite(new URL(`/test`, req.url));
        case UserRoles.SELLER:
          if (pathname.includes('/admin/')) {
            return NextResponse.rewrite(signinUrl);
          }
          return res;
        case UserRoles.ADMIN:
          return res;

        default:
          return NextResponse.rewrite(forbidden);
      }
    }
    return res;
  };
};

export default authHandler;
