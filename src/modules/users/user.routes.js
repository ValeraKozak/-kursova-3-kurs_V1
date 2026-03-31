import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { userController } from './user.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', roleMiddleware('ADMIN'), userController.getAll);

export default router;
