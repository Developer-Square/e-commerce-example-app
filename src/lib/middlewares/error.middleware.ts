import httpStatus from 'http-status';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { config, logger } from '@/config';

import { errorConverter } from '../error-handling';
import type ApiError from '../error-handling/ApiError';
import type { MiddlewareFactory } from './types';

const errorHandler: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = request.nextUrl;
    let response = NextResponse.next();
    if (pathname.startsWith('/api')) {
      try {
        await next(request, _next);
      } catch (error) {
        const convertedError: ApiError = errorConverter(error);
        if (config.env === 'production' && !convertedError.isOperational) {
          convertedError.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
          convertedError.message = `${
            httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
          }`;
        }
        if (config.env === 'development') {
          logger.error(convertedError);
        }
        response = new NextResponse(
          JSON.stringify({
            message: convertedError.message,
            ...(config.env === 'development' && {
              stack: convertedError.stack,
            }),
          }),
          {
            status: convertedError.statusCode,
            headers: { 'content-type': 'application/json' },
          }
        );

        return response;
      }
    }
    return response;
  };
};

export default errorHandler;
