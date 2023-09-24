// controladores de cargar documentos
import fs from "fs";
import User from "../../models/userModel.js";

const uploadUserImage = async (req, res) => {
    try {
      // recoger datos del fichero de imagen
      if (!req.file) {
        return res.status(400).json({ message: "No se ha subido ninguna imagen" })
      }
  
      // conseguir el nombre y la extension del archivo
      const image = req.file.originalname.split("\."); // separar el nombre de la extencion
      const extencion = image[1];  // extencion del archivo
      // extencion del archivo
  
      if (extencion != "png" && extencion != "jpg" && extencion != "jpeg" && extencion != "gif") { // comprobar la extencion
        const fileIMage = req.file.path; // ruta del fichero
        // comprobar la extencion, solo imagenes, si es valida borrar el fichero
  
        const filedelete = fs.unlinkSync(fileIMage);  // borrar el fichero de la carpeta uploads
        return res.status(400).json({ message: "La extension de la imagen no es valida" });
      }
  
      //actualizar campo img
      const userUpdateImg = await User.findByIdAndUpdate(req.user.id, { image: req.file.filename }, { new: true }); // actualizar el campo imagen del usuario
    
      if (!userUpdateImg) { // si no se ha actualizado la imagen
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
const viuwImage = async (req, res) => {
   res.json({message:"hola mundo"})
}

export { uploadUserImage, viuwImage };