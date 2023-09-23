// rutas de usuarios

import { Router } from 'express';
import {RegisterUser, getUsers,loginUser, profileUser,updateUser} from '../controller/userController.js';
import auth from '../middlewares/auth.js';

const router = Router();


// rutas de usuarios view de usuarios
router.get('/list/:page',auth, getUsers);

// rutas de crud de user
router.post('/', RegisterUser);
router.put('/update/:id',auth,updateUser);
// rutas de login

router.get('/profile/:id',auth, profileUser); 
router.post('/login', loginUser);




const userRoutes= router

export default userRoutes;