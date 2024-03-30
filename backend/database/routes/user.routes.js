import { Router } from 'express';
import { createNewUser } from '../../src/controllers/users.controller.js';
import {validateParameterUser} from '../../middlewares/validateParamsUser.js'

const router = Router();

router.post("/users", validateParameterUser, createNewUser);

export default router;

