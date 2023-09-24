 # dependencias para el proyecto
 
        "bcrypt": "^5.1.1" => para encriptar las contraseñas
        "cors": "^2.8.5"  => para permitir peticiones desde el front
        "express": "^4.18  => para el servidor
        "jwt-simple": "^0.5.6" => para generar tokens
        "mongoose-pagination": "^1.0.0" => para paginar
        "mongose": "^0.0.2-security"  => para conectar con mongo
        "multer": "^1.4.5-lts.1" => para subir archivos
        "nodemon": "^3.0.1" => para reiniciar el servidor
        "validator": "^13.11.0" => para validar datos


# subida de archivos con multer

configuracion general para manejar  la subida de archivos con multer

// configuracion de la subida de archivos

const   storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users');
    },
    filename: function(req, file, cb){
        cb(null,"avatar-"+Date.now() + file.originalname);
    }
});

// midleware para subir archivos
const  uploads= multer({storage}); 

ejemplo de uso en el controlador y rutas

ruta
router.post('/upload',[auth,uploads.single("file0")],uploadUserImage);

controlador

const uploadUserImage = async (req, res) => {
  try {
    // recoger datos del fichero de imagen
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" })
    }

    // conseguir el nombre y la extension del archivo
    const image = req.file.originalname.split("\.");
    const extencion = image[1];
    // extencion del archivo

    if (extencion != "png" && extencion != "jpg" && extencion != "jpeg" && extencion != "gif") {
      const fileIMage = req.file.path;
      // comprobar la extencion, solo imagenes, si es valida borrar el fichero

      const filedelete = fs.unlinkSync(fileIMage);
      return res.status(400).json({ message: "La extension de la imagen no es valida" });
    }

    //actualizar campo img
    const userUpdateImg = await User.findByIdAndUpdate(req.user.id, { image: req.file.filename }, { new: true });
  
    if (!userUpdateImg) {
      return res.status(404).json({
        msg: "error al no se ha podido actualizar la imagen",
        userUpdateImg
      });
    }


    // devolver respuesta
    res.status(200).json({
      msg: "Imagen subida correctamente",
      user: req.user,
      file: req.file,
      files: req.files
      
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al guardar el usuario", error: error.message });
  }

}