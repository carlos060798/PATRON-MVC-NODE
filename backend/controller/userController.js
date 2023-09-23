// controladores de usuarios

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generarToken from "../services/jwt.js";
import mongoosePaginate from "mongoose-paginate-v2";
import fs from "fs";

// controldor de usuarios
const getUsers = async (req, res) => {
  try {
    const defaultPage = 1;
    const page = req.params.page ? parseInt(req.params.page) : defaultPage;
    const itemsPerPage = 5;

    const options = {
      page,
      limit: itemsPerPage,
      sort: { _id: -1 },
      collation: {
        locale: "en",
      },
    };

    const users = await User.paginate({}, options);

    if (users.docs.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No se han encontrado usuarios",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Listado de usuarios",
      users: users.docs,
      page,
      itemsPerPage,
      totalUsers: users.totalDocs, // Agregar el total de usuarios
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      message: "Hubo un error al obtener los usuarios",
      error: error.message,
    });
  }
};

// crud de usuario
const RegisterUser = async (req, res) => {
  try {
    // Recoger datos de usuario
    const params = req.body;

    // Validar datos
    if (!params.name || !params.nick || !params.email || !params.password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Validar si el usuario existe
    const existingUser = await User.findOne({
      $or: [{ email: params.email.toLowerCase() }, { nick: params.nick.toLowerCase() }],
    });

    if (existingUser) {
      return res.status(200).json({ message: "El usuario ya existe" });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    params.password = await bcrypt.hash(params.password, salt);

    // Guardar usuario
    const userNew = new User(params);
    await userNew.save();

    // Devolver respuesta
    return res.status(200).json({
      message: "Usuario creado correctamente",
      userNew,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al guardar el usuario", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...resto } = req.body;

  try {
    // Si se proporciona un nuevo correo electrónico
    if (resto.email) {
      // Verificar si el nuevo email ya está registrado en otro usuario
      const existingUser = await User.findOne({ email: resto.email });
      if (existingUser && existingUser._id.toString() != id) {
        return res.status(400).json({
          msg: "El correo electrónico ya está registrado en otro usuario",
        });
      }
    }

    // Hash de la contraseña si se proporcionó una nueva contraseña
    if (password) {
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, resto, { new: true });

    if (!updatedUser) {
      return res.status(404).json({
        msg: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      msg: "Usuario modificado correctamente",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error al modificar el usuario",
      error,
    });
  }
};




// login de usuario

const loginUser = async (req, res) => {
  // recoger datos
  const params = req.body;
  if (!params.email || !params.password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  try {
    // buscar si existe el usuario
    const userexist = await User.findOne({ email: params.email })
    //.select({"password":0});
    if (!userexist) {
      return res.status(400).json({ message: "El usuario no existe" })
    }

    // comprobar la contraseña
    const passwordCorrect = await bcrypt.compare(params.password, userexist.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "no te has identificado correctamente" })
    }
    // crear token
    const token = generarToken(userexist);
    // devolver respuesta

    return res.status(200).json({
      message: "Usuario logueado correctamente",
      userexist: {
        _id: userexist._id,
        name: userexist.name,
        nick: userexist.nick,
      },
      token
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al guardar el usuario", error: error.message });
  }
}

const profileUser = async (req, res) => {
  // Recoger el id de la url
  const id = req.params.id;

  // Consulta para sacar los datos del usuario
  const userProfile = await User.findById(id).select({ password: 0, role: 0 });
  if (!userProfile) {
    return res.status(404).send({
      status: "error",
      message: "El usuario no existe o hay un error",
    });
  }

  // Devolver el resultado
  return res.status(200).send({
    status: "success",
    user: userProfile,
  });
};

// controladores para  archivos

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

export { getUsers, RegisterUser, loginUser, profileUser, updateUser, uploadUserImage };
