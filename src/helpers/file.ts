/**
 * This class contains image processing functions
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { AppError, HttpCode } from './appError';
export default class File {
  static originalPath = path.resolve(__dirname, '../../assets/images/full');
  static thumbPath = path.resolve(__dirname, '../../assets/images/thumb');

  /**
   * This function checks that the file name provided exist on server
   */
  static async isImageAvailable(filename: string): Promise<void> {
    const filePathFullImage: string = path.resolve(File.originalPath, `${filename}.jpg`);
    if (!fs.existsSync(filePathFullImage)) {
      throw new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        description: `Your file "${filename}" is not found on the server`
      });
    }
  }

  /**
   * This function creates the thumbnail if it does not exist. Otherwise it returns the path
   */
  static async createOrGetThumb(filename: string, width: string, height: string): Promise<void | string> {
    if (!fs.existsSync(File.thumbPath)) {
      fs.mkdirSync(File.thumbPath);
    }

    const filePathFullImage: string = `${path.resolve(File.originalPath, `${filename}.jpg`)}`;
    const filePathThumbImage: string = `${path.resolve(File.thumbPath, `${filename}-${width}x${height}.jpg`)}`;

    if (fs.existsSync(filePathThumbImage)) return filePathThumbImage;

    try {
      await sharp(filePathFullImage).resize(Number(width), Number(height)).toFormat('jpg').toFile(filePathThumbImage);
      console.log(`Creating thumb ${filePathThumbImage}`);

      return filePathThumbImage;
    } catch {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: `Server error. your image ${filename} could not be processed`
      });
    }
  }
}
