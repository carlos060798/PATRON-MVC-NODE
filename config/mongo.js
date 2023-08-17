//  conexion bases de la base mongo
import mongoose from 'mongoose';


//  conexion a la base de datos
const dbConnection = () => {
    
        try {
            mongoose.connect(process.env.MONGOURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
    
            console.log('Base de datos online');
    
        } catch (error) {
            console.log(error);
            throw new Error('Error a la hora de iniciar la base de datos');
        }
    
}

export default dbConnection;