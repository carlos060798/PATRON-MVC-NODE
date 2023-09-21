import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/db.js';
// crear servidor
 const app = express();
 dotenv.config();
 connectDB();
 const port = process.env.PORT || 4000;
  

// configurar cors


//  convertir datos a objetos


// rutas


// corre el servidor
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});