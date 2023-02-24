/* eslint-disable prefer-destructuring */
import httpStatus from "http-status";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { ZodError } from "zod";

class CustomApiError extends ApiError {
  errorCode?: number;

  constructor(statusCode:number, message:string, name: string, errorCode?: number) {
    super(statusCode, message);
    this.name = name;
    this.errorCode = errorCode;
  }
}

export const convertError = (error: any): CustomApiError => {
    if (error instanceof CustomApiError) return error;
    if (error instanceof ZodError) {
      return new CustomApiError(httpStatus.BAD_REQUEST, `Invalid value for field: ${error.issues[0]?.path.join(" > ")}`, 'Invalid input');
    }
    const statusCode: number = error.statusCode || httpStatus.BAD_REQUEST;
    const message: string = error.message || error.errmsg || 'Unknown error';
    const name: string = error.name;
    const errorCode: number = error.code;
    return new CustomApiError(statusCode, message, name, errorCode);
}

const catchError = (handler: Function) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        return handler(req, res)
          .catch((error: any) => {
            const convertedError: CustomApiError = convertError(error);
            const response = {
                status: convertedError.statusCode,
                message: convertedError.message,
                ...(process.env.NODE_ENV === 'development' && {
                  stack: convertedError.stack,
                  name: convertedError.name,
                }),
                ...(process.env.NODE_ENV === 'development' && convertedError.errorCode && {
                  code: convertedError.errorCode,
                }),
              };
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.error(convertedError);
            }
            return res.status(convertedError.statusCode).send(response);
          });
      }
};

export default catchError;