// rutas de  follows

import { Router } from 'express';
import {getFollowers,createFollow,deleteFollow} from '../controller/followController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/',getFollowers)

router.post('/save',auth,createFollow)
router.delete('/delete/:id',auth,deleteFollow)
const followRoutes= router

export default followRoutes;
 