// rutas de usuarios

import { Router } from 'express';
import {RegisterUser, getUsers,loginUser} from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();


// rutas de usuarios
router.get('/',auth, getUsers);
router.post('/', RegisterUser);
router.post('/login', loginUser);

const userRoutes= router

export default userRoutes;