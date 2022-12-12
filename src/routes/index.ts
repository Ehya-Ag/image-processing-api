/**
 * All routes must be imported here with their prefix
 */
import express from 'express';
const routes: express.Router = express.Router();
import images from './api/images';

//routes for image processing
routes.use('/images', images);

export default routes;
