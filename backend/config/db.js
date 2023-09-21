import mongoose from 'mongoose'



// Opciones de configuración de la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Agregar la opción writeConcern con un objeto válido
  // Puedes usar "majority" o cualquier otro nivel de garantía de escritura válido para tu configuración
  // En este ejemplo, se utilizará "majority"
  writeConcern: {
    w: 'majority',
    wtimeout: 0,
    provenance: 'clientSupplied'
  }
};

// Conectar a la base de datos
const connectDB=()=>{mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('Conexión exitosa a la base de datos' );
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
}

export default connectDB;
