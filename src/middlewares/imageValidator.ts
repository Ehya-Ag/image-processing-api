/**
 * This is a middleware for validating an image processing request
 */
import { Request, Response, NextFunction } from 'express';
import File from '../helpers/file';

const imageValidator = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!File.checkImageParams(req.query.filename as string, req.query.width as string, req.query.height as string)) {
    return res.status(400).send('You must provide: file name, width and height');
  }

  if (!File.checkImageWidth(req.query.width as string)) {
    return res.status(400).send('You must provide a numeric width greater than zero');
  }

  if (!File.checkImageHeight(req.query.height as string)) {
    return res.status(400).send('You must provide a numeric height greater than zero');
  }

  next();
};

export default imageValidator;
