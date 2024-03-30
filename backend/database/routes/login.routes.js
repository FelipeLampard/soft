import {Router} from 'express';
import { loginUser } from '../../src/controllers/login.controller.js';
import { validParameters } from '../../middlewares/validateParamsLogin.js';



const router = Router();

router.post('/auth_user', validParameters, loginUser)

export default router;