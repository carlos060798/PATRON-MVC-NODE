// rutas de la publisher
import {
    createPublic,
    getPublicdtail,
    deletePublic,
    getpublicUserMe,
} from '../controller/publicationController.js';
import { Router } from 'express';
import auth from '../middlewares/auth.js';

const router = Router();
router.post('/save',auth,createPublic);
router.get('/detail/:id',auth,getPublicdtail);
router.get('/user/:id/:page?',auth,getpublicUserMe);
router.delete('/delete/:id',deletePublic);

const publicRoutes = router

export default publicRoutes;