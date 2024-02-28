import { Router } from 'express';
import controller from './controller.js';
import authMiddleware from './shared/middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', controller.getImage);

router.get('/resized', controller.getResizedImage);

router.get('/download', controller.downloadImage);

export default router;
