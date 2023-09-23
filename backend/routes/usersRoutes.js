// rutas de usuarios

import { Router } from 'express';
import {RegisterUser, getUsers,loginUser, profileUser} from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();


// rutas de usuarios
router.post('/', RegisterUser);
router.post('/login', loginUser);

router.get('/list/:page',auth, getUsers);
// rutas de usuarios
router.get('/profile/:id',auth, profileUser);


const userRoutes= router

export default userRoutes;