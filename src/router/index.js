import express from 'express';
import { putValidation, deleteAndGetOneValidation, getAllValidation } from '../middlewares';
import { addRestaurant, deleteRestaurant, getOneRestaurant, getRestaurants, updateRestaurant } from '../services/restaurant';
import restaurantRouter from './restaurantRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use(restaurantRouter);
router.use(userRouter);

export default router;
