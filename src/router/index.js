import express from 'express';
import { putValidation } from '../middlewares/putValidation';
import { restaurantQueryValidation } from '../middlewares/restaurantQueryValidation';
import { addRestaurant, deleteRestaurant, getOneRestaurant } from '../services';
import { queryRestaurants } from '../services/queryRestaurants';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);
router.get('/restaurant', restaurantQueryValidation, getOneRestaurant);
router.get('/restaurants', queryRestaurants);
router.delete('/restaurant', restaurantQueryValidation, deleteRestaurant);
export default router;
