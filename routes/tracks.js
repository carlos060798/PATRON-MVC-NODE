// rutas de las canciones

import  express from "express";

const router = express.Router();


// importar el controlador
router.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la API de canciones" });
});



export default router;