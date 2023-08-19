// ruta de carga de archivos mediante multer

import express from "express";
import multer from "multer";

import { join, dirname } from 'path';

const router = express.Router();
// configuracion de multer

// Obtiene la ruta del directorio actual del módulo

// Define la ruta personalizada basada en la ubicación del módulo
const pathStorage = path.resolve(__dirname, '../storage');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Utiliza la ruta personalizada
        cb(null, pathStorage); // null porque no hay error
    },
    filename: (req, file, cb) => {
        // Validación para que no se repitan los nombres de los archivos
        const extension = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${extension}`; // Nombre del archivo con la fecha de subida

        cb(null, filename);
    },
});

const upload = multer({ storage });

// rutas de las canciones

router.post("/", upload.single("myfile"), (req, res) => {
    res.json({ message: "Bienvenido a la API de canciones" });
} );


export default router;