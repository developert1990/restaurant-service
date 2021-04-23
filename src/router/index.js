import express from 'express';
import { putValidation } from '../middlewares/putValidation';
import { addRestaurant } from '../services';

const router = express.Router();

router.put('/restaurant', putValidation, addRestaurant);

export default router;
