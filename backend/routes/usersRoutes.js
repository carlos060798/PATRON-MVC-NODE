import { Router } from 'express';
import { RegisterUser, getUsers, updateUser } from '../controller/userController.js';
import { loginUser, profileUser } from '../controller/seconds/LoginController.js';
import auth from '../middlewares/auth.js';
import uploads from '../middlewares/multerConfig.js';
import { uploadUserImage, viewImage } from '../controller/seconds/DocumentController.js';

const router = Router();

// Rutas para obtener la lista de usuarios (con paginación)
router.get('/list/:page', auth, getUsers);

// Rutas para registrar un nuevo usuario
router.post('/', RegisterUser);

// Rutas para actualizar información de usuario
router.put('/update/:id', auth, updateUser);

// Rutas para ver la imagen de usuario (avatar)
router.get('/avatar/:file',auth,viewImage);

// Rutas para subir una imagen de usuario
router.post('/upload', [auth, uploads.single("file0")],uploadUserImage);

// Rutas para ver el perfil de usuario
router.get('/profile/:id', auth, profileUser);

// Ruta para iniciar sesión de usuario
router.post('/login', loginUser);

const userRoutes = router;

export default userRoutes;
