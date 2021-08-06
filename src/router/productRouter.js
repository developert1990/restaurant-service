import express from 'express';
import Stripe from 'stripe';
import { payment } from '../services/product/payment';

const productRouter = express.Router();

productRouter.post('/payment', payment);

export default productRouter;
