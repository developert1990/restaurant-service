import express from 'express';
import { putValidation, getOneValidation } from '../middlewares';
import { addRestaurant } from '../services';
import { getOneRestaurant } from '../services/getOneRestaurant';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);
router.get('/restaurant', getOneValidation, getOneRestaurant);
export default router;
