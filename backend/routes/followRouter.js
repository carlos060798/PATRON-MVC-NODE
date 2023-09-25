import { Router } from 'express';
import { getFollowers, createFollow, deleteFollow, getFollowing } from '../controller/followController.js';
import auth from '../middlewares/auth.js';

const router = Router();

// Ruta para obtener la lista de usuarios seguidos por un usuario (opcionalmente por ID y página)
router.get('/following/:id?/:page?', auth, getFollowing);

// Ruta para obtener la lista de usuarios que siguen a un usuario (opcionalmente por ID y página)
router.get('/followers/:id?/:page?', auth, getFollowers);

// Ruta para crear un nuevo seguimiento (follow)
router.post('/save', auth, createFollow);

// Ruta para eliminar un seguimiento (follow) por ID
router.delete('/delete/:id', auth, deleteFollow);

const followRoutes = router;

export default followRoutes;
