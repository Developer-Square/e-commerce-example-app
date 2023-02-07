import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getLoginSession } from '@/lib/auth/auth';

import { Users } from '../users';
import { UserRoles } from '../users/users.types';
import type { MiddlewareFactory } from './types';

const authHandler: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    const response = next(request, _next);
    const signinUrl = new URL(`/signin`, request.url);
    const forbidden = new URL(`/403`, request.url);
    if (pathname.includes('/seller/') || pathname.includes('/admin/')) {
      const session = await getLoginSession(request);
      if (!session) {
        return NextResponse.rewrite(signinUrl);
      }
      const user = (await Users.findByName(session.name)) ?? null;
      switch (user?.role) {
        case undefined:
          return NextResponse.rewrite(signinUrl);
        case UserRoles.BUYER:
          return NextResponse.rewrite(forbidden);
        case UserRoles.SELLER:
          if (pathname.includes('/admin/')) {
            return NextResponse.rewrite(signinUrl);
          }
          return response;
        case UserRoles.ADMIN:
          return response;

        default:
          return NextResponse.rewrite(forbidden);
      }
    }
    return response;
  };
};

export default authHandler;
