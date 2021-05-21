import express from 'express';
import { putValidation, deleteAndGetOneValidation, getAllValidation } from '../middlewares';
import { addRestaurant, deleteRestaurant, getOneRestaurant, getRestaurants, updateRestaurant } from '../services';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);
router.get('/restaurant', deleteAndGetOneValidation, getOneRestaurant);
router.delete('/restaurant', deleteAndGetOneValidation, deleteRestaurant);
router.get('/restaurants', getAllValidation, getRestaurants);
router.patch('/restaurant', updateRestaurant);
export default router;
