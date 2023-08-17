// Este enfoque automatiza la creación de rutas basadas en los archivos presentes en el directorio
import express from 'express'; // Importamos el módulo Express para crear una aplicación web
import fs from 'fs'; // Importamos el módulo fs para trabajar con el sistema de archivos
import { fileURLToPath } from 'url'; // Importamos la función fileURLToPath de la librería url
import { dirname } from 'path'; // Importamos la función dirname de la librería path
// Importamos el módulo Router de Express para definir rutas
const router = express.Router();

// Obtenemos la ruta completa del archivo actual
const __filename = fileURLToPath(import.meta.url); // Convertimos la URL del archivo a ruta de sistema
const __dirname = dirname(__filename); // Obtenemos el directorio del archivo actual

// Función para quitar la extensión de los nombres de archivo
const removeExtension = (filename) => {
    return filename.split('.').shift(); // Separamos el nombre de la extensión y tomamos el primer elemento
}; 

// Leemos el contenido del directorio actual y filtramos los archivos
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file); // Obtenemos el nombre del archivo sin la extensión

    // Verificamos si el archivo no se llama 'index' y no es el propio 'index.js'
    if (name !== 'index' && file !== 'index.js') {
        console.log(name); // Mostramos el nombre del archivo por consola

        // Importamos el módulo correspondiente usando una ruta relativa
        import(`./${file}`).then((module) => {
            // Agregamos una ruta al router para el módulo importado
            router.use(`/${name}`, module.default);
        });
    }
});

export default router;