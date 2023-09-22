// rutas de la publisher
import  {getPublics} from '../controller/publicationController.js';
import { Router } from 'express';

const router = Router();
 router.get('/', getPublics);

const publicRoutes= router

export default publicRoutes;