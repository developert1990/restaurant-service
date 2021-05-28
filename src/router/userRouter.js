import express from 'express';
import { testUser } from '../services/user/testUser';

const userRouter = express.Router();

userRouter.post('/user', testUser);

export default userRouter;
