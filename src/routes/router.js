import express from 'express';
import authRouter from './authRouter.js';
import collectionsRouter from './collectionsRouter.js';
import commentsRouter from './commentsRouter.js';
import adminRouter from './adminRouter.js';

const router = express.Router();

router.use('/api/v1/auth', authRouter);
router.use('/api/v1/collections', collectionsRouter);
router.use('/api/v1/comments', commentsRouter);
router.use('/api/v1/admin/users', adminRouter);

export default router;
