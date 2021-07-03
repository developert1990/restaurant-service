import express from 'express';
import { addUserValidation } from '../middlewares/user/addUserValidation';
import { createUser } from '../services/users/controllers/createUser';
import { deleteUser } from '../services/users/controllers/deleteUser';
import { signin } from '../services/users/controllers/signIn';
import { initialAWS } from '../config/awsConfig';
import { deleteUserValidation } from '../middlewares/user/deleteUserValidation';
import { authUser } from '../services/users/controllers/authUser';
import { verifyUser } from '../services/users/controllers/verifyUser';
import { signOut } from '../services/users/controllers/signOut';

initialAWS();
const userRouter = express.Router();

userRouter.post('/user', signin);
userRouter.delete('/user', deleteUserValidation, deleteUser);
userRouter.put('/user', addUserValidation, createUser); // put: entire update
userRouter.get('/user', authUser);
userRouter.patch('/user', verifyUser); // patch: partial update
userRouter.put('/user/signout', signOut);

export default userRouter;
