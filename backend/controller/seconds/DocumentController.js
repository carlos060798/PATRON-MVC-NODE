// controladores de cargar documentos
import fs from "fs";
import User from "../../models/userModel.js";
import path from "path";
import Publication from "../../models/publicationModel.js";

// Controlador para cargar imágenes de usuario
const uploadUserImage = async (req, res) => {
  try {
    // Recoger datos del fichero de imagen
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" })
    }

    // Obtener el nombre y la extensión del archivo
    const image = req.file.originalname.split("\."); // Separar el nombre de la extensión
    const extencion = image[1];  // Extensión del archivo

    if (extencion != "png" && extencion != "jpg" && extencion != "jpeg" && extencion != "gif") { // Comprobar la extensión
      const fileImage = req.file.path; // Ruta del fichero
      // Comprobar la extensión, solo imágenes, si no es válida borrar el fichero

      const fileDelete = fs.unlinkSync(fileImage);  // Borrar el fichero de la carpeta "uploads"
      return res.status(400).json({ message: "La extensión de la imagen no es válida" });
    }

    // Actualizar campo "img" del usuario
    const userUpdateImg = await User.findByIdAndUpdate(req.user.id, { image: req.file.filename }, { new: true }); // Actualizar el campo "imagen" del usuario
  
    if (!userUpdateImg) { // Si no se ha actualizado la imagen
      return res.status(404).json({
        msg: "Error al no se ha podido actualizar la imagen",
        userUpdateImg
      });
    }

    // Devolver respuesta
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

// Controlador para ver una imagen de usuario
const viewImage = async (req, res) => {
// Sacar parámetros de la URL
const { file } = req.params; // Sacar el nombre del fichero

// Montar el path donde está el fichero
const pathFile = `./uploads/users/${file}`; // Ruta del fichero

// Comprobar si existe el fichero
const pathExists = fs.existsSync(pathFile); // Comprobar si el fichero existe

if (!pathExists) { // Si no existe el fichero
  return res.status(404).json({ message: "No existe la imagen" }); // Devolver mensaje de error 
}

// Devolver la imagen
return res.sendFile(path.resolve(pathFile)); // Devolver la imagen
}

const uploadUserPublication = async (req, res) => {
  // sacar publicacion id 
   const publicationId = req.params.id;
  try {
    // Recoger datos del fichero de imagen
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" })
    }

    // Obtener el nombre y la extensión del archivo
    const image = req.file.originalname.split("\."); // Separar el nombre de la extensión
    const extencion = image[1];  // Extensión del archivo

    if (extencion != "png" && extencion != "jpg" && extencion != "jpeg" && extencion != "gif") { // Comprobar la extensión
      const fileImage = req.file.path; // Ruta del fichero
      // Comprobar la extensión, solo imágenes, si no es válida borrar el fichero

      const fileDelete = fs.unlinkSync(fileImage);  // Borrar el fichero de la carpeta "uploads"
      return res.status(400).json({ message: "La extensión de la imagen no es válida" });
    }

    // Actualizar campo "img" del usuario
    const userSavePublication = await Publication.findByIdAndUpdate({"user":req.user.id ,"_id":publicationId}, { file: req.file.filename }, { new: true }); // Actualizar el campo "imagen" del usuario
  
    if (!userSavePublication) { // Si no se ha actualizado la imagen
      return res.status(404).json({
        msg: "Error al no se ha podido actualizar la imagen de la publicacion",
        userSavePublication
      });
    }

    // Devolver respuesta
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
export {
  uploadUserImage,
  viewImage,
  uploadUserPublication
}