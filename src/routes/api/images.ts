import express from 'express';
const images: express.Router = express.Router();
import imageValidator from '../../middlewares/imageValidator';
import File from '../../helpers/file';
import { AppError, HttpCode } from '../../helpers/appError';

images.get(
  '/',
  imageValidator,
  async (req: express.Request, res: express.Response): Promise<void | express.Response> => {
    const filePathThumbImage: void | string = await File.createOrGetThumb(
      req.query.filename as string,
      req.query.width as string,
      req.query.height as string
    );
    if (filePathThumbImage) return res.sendFile(filePathThumbImage);
    else {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Error occured processing the image'
      });
    }
  }
);

export default images;
