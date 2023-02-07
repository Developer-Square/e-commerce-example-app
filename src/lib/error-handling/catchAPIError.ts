import httpStatus from 'http-status';
import { MongoError, WriteConcernError, WriteError } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

import envVariables from '../../config/envVariables';
import logger from '../../config/logger';
import ApiError from './ApiError';

export const errorConverter = (error: any): ApiError => {
  if (error instanceof ApiError) return error;
  const statusCode =
    error.statusCode || error instanceof MongoError
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
  const message: string =
    error.message ||
    error instanceof WriteError ||
    error instanceof WriteConcernError
      ? error.errmsg
      : `${httpStatus[statusCode]}`;
  return new ApiError(statusCode, message, false, error.stack);
};

export const CustomResponse = (
  message: string,
  status: number
): NextResponse => {
  return new NextResponse(
    JSON.stringify({
      message,
    }),
    {
      status,
      headers: { 'content-type': 'application/json' },
    }
  );
};

const catchAPIError =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) =>
    handler(req, res).catch((error: any) => {
      const convertedError: ApiError = errorConverter(error);
      if (envVariables.env === 'production' && !convertedError.isOperational) {
        convertedError.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        convertedError.message = `${
          httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
        }`;
      }
      const response = {
        code: convertedError.statusCode,
        message: convertedError.message,
        ...(envVariables.env === 'development' && {
          stack: convertedError.stack,
        }),
      };
      if (envVariables.env === 'development') {
        logger.error(convertedError);
      }
      res.status(convertedError.statusCode).send(response);
    });

export default catchAPIError;
