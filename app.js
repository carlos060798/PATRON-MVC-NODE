import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexroutes from './routes/index.js';

import dbConnection from './config/mongo.js';
const app = express();
dotenv.config();
dbConnection();

app.use(cors());
app.use(express.json());




app.use('/api',indexroutes);




const  port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})