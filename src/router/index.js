import express from 'express';
import restaurantRouter from './restaurantRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use(restaurantRouter);
router.use(userRouter);

export default router;
