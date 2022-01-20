import express, { Router } from 'express';
import { buildRo } from '../../middleware/response';
import { auth } from '../../middleware/auth';
import { getAll, createKrypto, updateKrypto, getById, deleteKrypto } from './krypto.controller';

/**
* @main
* @description
* Declaration of main router
**/
const kryptoRouter: Router = express.Router();

/**
 * @method POST
 */
kryptoRouter.post('/', createKrypto, buildRo);

/**
 * @method GET
 */
kryptoRouter.get('/', auth, getAll, buildRo);
kryptoRouter.get('/:id', auth, getById, buildRo);

/**
 * @method UPDATE
 */
kryptoRouter.patch('/:id', auth, updateKrypto, buildRo);

/**
 * @method DELETE
 */
kryptoRouter.delete('/:id', auth, deleteKrypto, buildRo);


export default kryptoRouter;
