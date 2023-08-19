// rutas de las canciones

import  express from "express";
import { getItem,CreadItem } from "../controllers/tracksController.js";

const router = express.Router();


// importar el controlador
router.get("/", );

router.get("/:id", getItem);

router.post("/", CreadItem);


export default router;