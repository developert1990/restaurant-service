import express from 'express';
import { test } from '../services';

const router = express.Router();

router.get('/test', test);

export default router;
