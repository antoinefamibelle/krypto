import express, { Router } from 'express';

import userRouter from './app/user/router';

/**
* @main
* @description
* Declaration of main router
**/

const router: Router = express.Router();

router.use('/api/v1/', [
    router.use('/user', userRouter)
]);

export default router;
