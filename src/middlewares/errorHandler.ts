import { Request, Response, NextFunction } from 'express';
import { AppError } from '../helpers/appError';

const ErrorHandler = (err: AppError | Error, req: Request, res: Response, _next: NextFunction): void => {
  let errStatus: number;
  let errMsg: string;

  if (err instanceof AppError) {
    errStatus = err.httpCode;
    errMsg = err.message;
  } else {
    errStatus = 500;
    errMsg = 'Internal server error';
  }
  res.status(errStatus).send(errMsg);
};

export default ErrorHandler;
