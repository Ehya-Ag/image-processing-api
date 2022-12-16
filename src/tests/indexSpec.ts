import fs from 'fs';
import path from 'path';
import supertest, { Response, SuperTest, Test } from 'supertest';
import app from '../index';
import File from '../helpers/file';
import sizeOf from 'image-size';

const request: SuperTest<Test> = supertest(app);

describe('Tests for image processing API', (): void => {
  describe('GET /', (): void => {
    it('responds with status 200', async (): Promise<void> => {
      const response: Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /not-found', (): void => {
    it('responds with status 404', async (): Promise<void> => {
      const response: Response = await request.get('/not-found');
      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/images', (): void => {
    it('responds with status 400 if no correct params : /api/images', async (): Promise<void> => {
      const response: Response = await request.get('/api/images');
      expect(response.status).toBe(400);
    });
    it('responds with status 400 if missing params : /api/images?filename=no&width=0', async (): Promise<void> => {
      const response: Response = await request.get('/api/images?filename=no&width=0');
      expect(response.status).toBe(400);
    });
    it('responds with status 400 if missing params : /api/images?filename=no&width=0&height=100', async (): Promise<void> => {
      const response: Response = await request.get('/api/images?filename=no&width=0&height=100');
      expect(response.status).toBe(400);
    });
    it('responds with status 400 if missing params : /api/images?width=0&height=100', async (): Promise<void> => {
      const response: Response = await request.get('/api/images?&width=0&height=100');
      expect(response.status).toBe(400);
    });
    it('responds with status 400 if all params is correct and image not exist : /api/images?filename=encenadaportno&width=200&height=400', async (): Promise<void> => {
      const response: Response = await request.get('/api/images?filename=encenadaportno&width=200&height=400');
      expect(response.status).toBe(400);
    });
    it('responds with status 200 if all params is correct and image exist : /api/images?filename=encenadaport&width=200&height=400', async (): Promise<void> => {
      const response: Response = await request.get('/api/images?filename=encenadaport&width=200&height=400');
      expect(response.status).toBe(200);
    });
    it('create a thumbnail of image : /api/images?filename=encenadaport&width=600&height=400', async (): Promise<void> => {
      request.get('/api/images?filename=encenadaport&width=600&height=400').then(() => {
        const filePathThumbImage: string = `${path.resolve(File.thumbPath, `encenadaport-600x400.jpg`)}`;
        expect(filePathThumbImage).not.toBeNull();
      });
    });
    it('verify width and height of created image : /api/images?filename=encenadaport&width=600&height=400', async (): Promise<void> => {
      request.get('/api/images?filename=encenadaport&width=600&height=400').then(() => {
        const filePathThumbImage: string = `${path.resolve(File.thumbPath, `encenadaport-600x400.jpg`)}`;
        const dimensions = sizeOf(filePathThumbImage);
        expect(dimensions.width).toEqual(600);
        expect(dimensions.height).toEqual(400);
      });
    });
  });
});

afterAll(async (): Promise<void> => {
  const filePathThumbImage: string = `${path.resolve(File.thumbPath, `encenadaport-600x400.jpg`)}`;

  try {
    if (fs.existsSync(filePathThumbImage)) {
      fs.unlinkSync(filePathThumbImage);
    }
  } catch {
    // intentionally left blank
  }
});
