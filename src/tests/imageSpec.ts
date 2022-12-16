import fs from 'fs';
import path from 'path';
import File from '../helpers/file';
import sizeOf from 'image-size';
import { AppError, HttpCode } from '../helpers/appError';

describe('Tests image processing with sharp package', (): void => {
  it('returns error because invalid width', async (): Promise<void> => {
    await expectAsync(File.createOrGetThumb('encenadaport', '-100', '100')).toBeRejectedWith(
      new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: `Server error. your image encenadaport could not be processed`
      })
    );
  });

  it('returns error because invalid height', async (): Promise<void> => {
    await expectAsync(File.createOrGetThumb('encenadaport', '100', '0')).toBeRejectedWith(
      new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: `Server error. your image encenadaport could not be processed`
      })
    );
  });

  it('returns error because file does not exist', async (): Promise<void> => {
    await expectAsync(File.createOrGetThumb('encenadaports', '100', '100')).toBeRejectedWith(
      new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: `Server error. your image encenadaports could not be processed`
      })
    );
  });

  it('successful resized thumb file (existing file, valid width and height)', async (): Promise<void> => {
    await File.createOrGetThumb('encenadaport', '100', '100');
    const filePathThumbImage: string = `${path.resolve(File.thumbPath, `encenadaport-100x100.jpg`)}`;
    const dimensions = sizeOf(filePathThumbImage);
    expect(dimensions.width).toEqual(100);
    expect(dimensions.height).toEqual(100);
  });
});

afterAll(async (): Promise<void> => {
  const filePathThumbImage: string = `${path.resolve(File.thumbPath, `encenadaport-100x100.jpg`)}`;

  try {
    if (fs.existsSync(filePathThumbImage)) {
      fs.unlinkSync(filePathThumbImage);
    }
  } catch {
    // intentionally left blank
  }
});
