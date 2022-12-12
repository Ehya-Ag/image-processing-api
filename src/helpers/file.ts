/**
 * This class contains image processing functions
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export default class File {
  static originalPath = path.resolve(__dirname, '../../assets/images/full');
  static thumbPath = path.resolve(__dirname, '../../assets/images/thumb');

  /**
   * This function verifies that all required parameters are provided
   */
  static checkImageParams = (filename?: string, width?: string, height?: string): boolean => {
    if (!filename || !width || !height) return false;
    else return true;
  };

  /**
   * This function checks that the provided width is valid
   */
  static checkImageWidth = (width?: string): boolean => {
    if (Number.isNaN(width) || Number(width) <= 0) return false;
    else return true;
  };

  /**
   * This function checks that the provided height is valid
   */
  static checkImageHeight = (height?: string): boolean => {
    if (Number.isNaN(height) || Number(height) <= 0) return false;
    else return true;
  };

  /**
   * This function checks that the file name provided exist on server
   */
  static async isImageAvailable(filename: string): Promise<boolean> {
    const filePathFullImage: string = path.resolve(File.originalPath, `${filename}.jpg`);
    try {
      if (fs.existsSync(filePathFullImage)) return true;
    } catch {
      return false;
    }
    return false;
  }

  /**
   * This function creates the thumbnail if it does not exist. Otherwise it returns the path
   */
  static async createOrGetThumb(filename: string, width: string, height: string): Promise<null | string> {
    if (!fs.existsSync(File.thumbPath)) {
      fs.mkdirSync(File.thumbPath);
    }

    const filePathFullImage: string = `${path.resolve(File.originalPath, `${filename}.jpg`)}`;
    const filePathThumbImage: string = `${path.resolve(File.thumbPath, `${filename}-${width}x${height}.jpg`)}`;

    if (fs.existsSync(filePathThumbImage)) return filePathThumbImage;

    console.log(`Creating thumb ${filePathThumbImage}`);

    return await sharp(filePathFullImage)
      .resize(Number(width), Number(height))
      .toFormat('jpg')
      .toFile(filePathThumbImage)
      .then((): string => filePathThumbImage)
      .catch((): null => null);
  }
}
