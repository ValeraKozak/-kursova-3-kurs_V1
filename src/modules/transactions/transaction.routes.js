import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { transactionController } from './transaction.controller.js';
import { createTransactionSchema, updateTransactionSchema } from './transaction.validation.js';

const router = Router();

router.use(authMiddleware);
router.post('/', validate(createTransactionSchema), transactionController.create);
router.get('/', transactionController.getAll);
router.put('/:id', validate(updateTransactionSchema), transactionController.update);
router.delete('/:id', transactionController.remove);

export default router;
