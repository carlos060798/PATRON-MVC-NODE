// rutas de usuarios

import { Router } from 'express';
import {RegisterUser, getUsers,loginUser} from '../controller/userController.js';


const router = Router();


// rutas de usuarios
router.get('/', getUsers);
router.post('/', RegisterUser);
router.post('/login', loginUser);

const userRoutes= router

export default userRoutes;