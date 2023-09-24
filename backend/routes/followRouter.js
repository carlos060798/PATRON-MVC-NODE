// rutas de  follows

import { Router } from 'express';
import {getFollowers,createFollow,deleteFollow,getFollowing} from '../controller/followController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/following/:id?/:page?',auth,getFollowing)
router.get('/followers/:id?/:page?',auth,getFollowers)
router.post('/save',auth,createFollow)
router.delete('/delete/:id',auth,deleteFollow)
const followRoutes= router

export default followRoutes;
 