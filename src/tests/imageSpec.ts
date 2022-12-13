import fs from 'fs';
import path from 'path';
import File from '../helpers/file';
import sizeOf from 'image-size';

describe('Tests image processing with sharp package', (): void => {
  it('returns error because invalid width', async (): Promise<void> => {
    let result: null | string = '';
    try {
      result = await File.createOrGetThumb('encenadaport', '-100', '100');
    } catch {
      result = null;
    }
    expect(result).toBeNull();
  });

  it('returns error because invalid height', async (): Promise<void> => {
    let result: null | string = '';
    try {
      result = await File.createOrGetThumb('encenadaport', '100', '0');
    } catch {
      result = null;
    }
    expect(result).toBeNull();
  });

  it('returns error because file does not exist', async (): Promise<void> => {
    let result: null | string = '';
    try {
      result = await File.createOrGetThumb('encenadaports', '100', '100');
    } catch {
      result = null;
    }
    expect(result).toBeNull();
  });

  // Note: Could also fail because of directory permissions
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
