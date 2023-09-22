// rutas de  follows

import { Router } from 'express';
import {getFollowers} from '../controller/followController.js';


const router = Router();

router.get('/',getFollowers)

const followRoutes= router

export default followRoutes;
 