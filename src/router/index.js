import express from 'express';
import productRouter from './productRouter';
import restaurantRouter from './restaurantRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use(restaurantRouter);
router.use(userRouter);
router.use(productRouter);

export default router;
