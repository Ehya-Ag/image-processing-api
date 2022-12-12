/**
 * This file contains all the routes for image processing
 */
import express from 'express';
const images: express.Router = express.Router();
import imageValidator from '../../middlewares/imageValidator';
import File from '../../helpers/file';

images.get(
  '/',
  imageValidator,
  async (req: express.Request, res: express.Response): Promise<void | express.Response> => {
    if (!(await File.isImageAvailable(req.query.filename as string))) {
      return res.status(500).send(`The server cannot find the file ${req.query.filename}`);
    } else {
      const filePathThumbImage: null | string = await File.createOrGetThumb(
        req.query.filename as string,
        req.query.width as string,
        req.query.height as string
      );
      if (filePathThumbImage) return res.sendFile(filePathThumbImage);
      return res.status(500).send('Error occured processing the image');
    }
  }
);

export default images;
