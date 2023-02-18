import httpStatus from 'http-status';

class ApiError extends Error {
  statusCode: number;

  isOperational: boolean;

  override stack?: string;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errorConverter = (error: any): ApiError => {
  if (error instanceof ApiError) return error;
  const statusCode = error.statusCode || httpStatus.BAD_REQUEST;
  const message: string =
    error.message || error.errmsg || `${httpStatus[statusCode]}`;
  return new ApiError(statusCode, message, false, error.stack);
};

export default ApiError;
