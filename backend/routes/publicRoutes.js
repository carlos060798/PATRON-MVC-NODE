// Importar los controladores de publicaciones y otras dependencias necesarias
import {
    createPublic,
    getPublicdtail,
    deletePublic,
    getpublicUserMe,
    publicFeed
} from '../controller/publicationController.js';
import { Router } from 'express';
import auth from '../middlewares/auth.js';
import multer from 'multer'; 
import { uploadUserPublication,  viewPublication} from '../controller/seconds/DocumentController.js';

// Configuración de la subida de archivos utilizando Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        // Directorio de destino para las imágenes de publicaciones
        cb(null, './uploads/publication');
    },
    filename: function(req, file, cb){
        // Nombre de archivo para la imagen de la publicación
        cb(null, "pub-" + Date.now() + file.originalname);
    }
});

// Middleware para subir archivos utilizando Multer
const uploads = multer({storage});

// Crear una instancia de Router de Express
const router = Router();

// Definir las rutas y vincularlas a los controladores correspondientes
router.post('/save', auth, createPublic); // Ruta para crear una nueva publicación
router.get('/detail/:id', auth, getPublicdtail); // Ruta para obtener detalles de una publicación por su ID
router.get('/user/:id/:page?', auth, getpublicUserMe); // Ruta para obtener las publicaciones de un usuario
router.get('/publication/:file', viewPublication); // Ruta para ver una publicación específica
router.get('/feed/:page?', auth, publicFeed); // Ruta para obtener el feed de publicaciones
router.delete('/delete/:id', deletePublic); // Ruta para eliminar una publicación por su ID
router.post('/upload/:id', [auth, uploads.single("file0")], uploadUserPublication); // Ruta para subir una imagen de publicación

// Exportar las rutas configuradas
const publicRoutes = router;

export default publicRoutes;









/* descomentar si no sirve este
/ rutas de la publisher
import {
    createPublic,
    getPublicdtail,
    deletePublic,
    getpublicUserMe,
    publicFeed
} from '../controller/publicationController.js';
import { Router } from 'express';
import auth from '../middlewares/auth.js';
import multer from 'multer'; 
import { uploadUserPublication,  viewPublication} from '../controller/seconds/DocumentController.js';

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
router.get('/publication/:file',viewPublication);
router.get('/feed/:page?',auth,publicFeed);
router.delete('/delete/:id',deletePublic);
router.post('/upload/:id',[auth,uploads.single("file0")],uploadUserPublication);

const publicRoutes = router

export default publicRoutes;*/