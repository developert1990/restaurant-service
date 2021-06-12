import express from 'express';
import { putValidation, deleteAndGetOneValidation, getAllValidation } from '../middlewares/restaurant';
import { addRestaurant, deleteRestaurant, getOneRestaurant, getRestaurants, updateRestaurant } from '../services/restaurant';

const restaurantRouter = express.Router();

restaurantRouter.put('/restaurant', putValidation, addRestaurant);
restaurantRouter.get('/restaurant', deleteAndGetOneValidation, getOneRestaurant);
restaurantRouter.delete('/restaurant', deleteAndGetOneValidation, deleteRestaurant);
restaurantRouter.get('/restaurants', getAllValidation, getRestaurants);
restaurantRouter.patch('/restaurant', updateRestaurant);

export default restaurantRouter;
