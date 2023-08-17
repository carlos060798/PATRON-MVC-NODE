import express from 'express';
import RouterUsuarios from './routes/UsuarioRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './config/mongo.js';
const app = express();
dotenv.config();
dbConnection();
const  port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/usuarios', RouterUsuarios);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})