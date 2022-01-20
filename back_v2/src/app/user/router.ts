import express, { Router } from 'express';
import { buildRo } from '../../middleware/response';
import { auth } from '../../middleware/auth';
import { getAll, login, register, getCurrentUser, getById, updateCurrentUser } from './user.controller';

/**
* @main
* @description
* Declaration of main router
**/
const userRouter: Router = express.Router();

/**
 * @method POST
 */
userRouter.post('/register', register, buildRo);
userRouter.post('/login', login, buildRo);

/**
 * @method GET
 */
userRouter.get('/', auth, getAll, buildRo);
userRouter.get('/me', auth, getCurrentUser, buildRo);
userRouter.get('/:id', auth, getById, buildRo);

/**
 * @method UPDATE
 */
userRouter.patch('/me', auth, updateCurrentUser, buildRo);


export default userRouter;
