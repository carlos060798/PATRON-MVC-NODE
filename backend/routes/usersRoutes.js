// rutas de usuarios

import { Router } from 'express';
import { RegisterUser, getUsers, updateUser } from '../controller/userController.js';
import { loginUser, profileUser } from '../controller/seconds/LoginController.js';
import { viuwImage, uploadUserImage } from '../controller/seconds/DocumentController.js';
import auth from '../middlewares/auth.js';
import uploads from '../middlewares/multerConfig.js';

const router = Router();


// rutas de usuarios view de usuarios
router.get('/list/:page', auth, getUsers);

// rutas de crud de user
router.post('/', RegisterUser);
router.put('/update/:id', auth, updateUser);
// rutas de archivos
router.get('/upload/:id', auth, viuwImage);
router.post('/upload', [auth, uploads.single("file0")], uploadUserImage);
// rutas de login

router.get('/profile/:id', auth, profileUser);
router.post('/login', loginUser);





const userRoutes = router

export default userRoutes;