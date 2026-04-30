import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { forecastController } from './forecast.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/month', forecastController.getMonthlyForecast);

export default router;