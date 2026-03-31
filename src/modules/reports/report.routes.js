import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { reportController } from './report.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/balance', reportController.getBalance);
router.get('/stats', reportController.getStats);

export default router;
