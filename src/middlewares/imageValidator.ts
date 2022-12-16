/**
 * This is a middleware for validating an image processing request
 */
import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../helpers/appError';
import File from '../helpers/file';

const imageValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filename: string = req.query.filename as string;
  const width: string = req.query.width as string;
  const height: string = req.query.height as string;

  if (!filename)
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'The filename parameter is required'
    });

  if (isNaN(Number(width)) || Number(width) <= 0)
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'The width is invalid. Width must be a numeric value greater than zero'
    });

  if (isNaN(Number(height)) || Number(height) <= 0)
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: 'The height is invalid. Height must be a numeric value greater than zero'
    });

  await File.isImageAvailable(req.query.filename as string);

  next();
};

export default imageValidator;
