import express from 'express';
import { putValidation, deleteAndGetOneValidation } from '../middlewares';
import { addRestaurant, deleteRestaurant, getOneRestaurant, getRestaurants } from '../services';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);
router.get('/restaurant', deleteAndGetOneValidation, getOneRestaurant);
router.delete('/restaurant', deleteAndGetOneValidation, deleteRestaurant);
router.get('/restaurants', getRestaurants);
export default router;
