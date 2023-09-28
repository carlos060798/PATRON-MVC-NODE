import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/usersRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import followRoutes from './routes/followRouter.js';
// crear servidor
 const app = express();
 dotenv.config();
 connectDB();
 const port = process.env.PORT || 4000;
  

// configurar cors
// cors para que se pueda conectar con el front

const dominiosPermitidos = ["http://127.0.0.1:5173"] // dominios permitidos para recibir peticiones


const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            // El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No esta permitido por CORS'))
        }
    }
}
app.use(cors({ origin: '*' }))
//  convertir datos a objetos
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //  cuando se envian datos desde un formulario de cors se hace en json

// rutas
app.use('/api/users',userRoutes);
app.use('/api/public',publicRoutes);
app.use('/api/follow',followRoutes);


// corre el servidor
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});