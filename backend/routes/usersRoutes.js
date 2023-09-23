// rutas de usuarios

import { Router } from 'express';
import {RegisterUser, getUsers,loginUser, profileUser,updateUser, uploadUserImage} from '../controller/userController.js';
import auth from '../middlewares/auth.js';
import multer from 'multer';

// configuracion de la subida de archivos

const   storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users');
    },
    filename: function(req, file, cb){
        cb(null,"avatar-"+Date.now() + file.originalname);
    }
});

// midleware para subir archivos
const  uploads= multer({storage});




const router = Router(); 


// rutas de usuarios view de usuarios
router.get('/list/:page',auth, getUsers);

// rutas de crud de user
router.post('/', RegisterUser);
router.put('/update/:id',auth,updateUser);
router.post('/upload',[auth,uploads.single("file0")],uploadUserImage);
// rutas de login

router.get('/profile/:id',auth, profileUser); 
router.post('/login', loginUser);





const userRoutes= router

export default userRoutes;