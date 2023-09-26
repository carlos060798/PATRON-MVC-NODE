// rutas de la publisher
import {
    createPublic,
    getPublicdtail,
    deletePublic,
    getpublicUserMe,
} from '../controller/publicationController.js';
import { Router } from 'express';
import auth from '../middlewares/auth.js';
import multer from 'multer';
import { uploadUserPublication } from '../controller/seconds/DocumentController.js';

// configuracion de la subida de archivos

const   storage = multer.diskStorage({
    destination: function(req, file, cb){ // destino de la imagen
        cb(null, './uploads/publication');
    },
    filename: function(req, file, cb){ // nombre de la imagen
        cb(null,"pub-"+Date.now() + file.originalname);
    }
});

// midleware para subir archivos
const  uploads= multer({storage});

const router = Router();
router.post('/save',auth,createPublic);
router.get('/detail/:id',auth,getPublicdtail);
router.get('/user/:id/:page?',auth,getpublicUserMe);
router.delete('/delete/:id',deletePublic);
router.post('/upload/:id',[auth,uploads.single("file0")],uploadUserPublication);

const publicRoutes = router

export default publicRoutes;