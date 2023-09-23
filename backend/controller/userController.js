// controladores de usuarios

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generarToken from "../services/jwt.js";
import mongoosePaginate from "mongoose-paginate-v2"
  

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

const loginUser = async (req, res) => {
    // recoger datos
      const params = req.body;
     if (!params.email || !params.password ) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
      try{
       // buscar si existe el usuario
       const userexist = await User.findOne({email: params.email})
       //.select({"password":0});
         if(!userexist){
              return res.status(400).json({message: "El usuario no existe"})
         }

     // comprobar la contraseña
        const passwordCorrect = await bcrypt.compare(params.password, userexist.password);
        if(!passwordCorrect){
            return res.status(400).json({message: "no te has identificado correctamente"}) 
        }
        // crear token
        const token = generarToken(userexist);
        // devolver respuesta

        return res.status(200).json({
            message: "Usuario logueado correctamente",
            userexist:{
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
  


export { getUsers, RegisterUser,loginUser,profileUser };
