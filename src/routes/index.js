import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import categoryRoutes from '../modules/categories/category.routes.js';
import transactionRoutes from '../modules/transactions/transaction.routes.js';
import reportRoutes from '../modules/reports/report.routes.js';
import userRoutes from '../modules/users/user.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);

export default router;
