import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { categoryController } from './category.controller.js';
import { createCategorySchema } from './category.validation.js';

const router = Router();

router.use(authMiddleware);
router.post('/', validate(createCategorySchema), categoryController.create);
router.get('/', categoryController.getAll);

export default router;
