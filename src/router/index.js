import express from 'express';
import { putValidation } from '../middlewares/putValidation';
import { restaurantQueryValidation } from '../middlewares/restaurantQueryValidation';
import { addRestaurant, deleteRestaurant } from '../services';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);
router.delete('/restaurant', restaurantQueryValidation, deleteRestaurant);

export default router;
