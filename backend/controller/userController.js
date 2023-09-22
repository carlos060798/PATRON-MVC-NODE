// controladores de usuarios

import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  res.json({ message: "get users" });
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
        const token = false
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

  


export { getUsers, RegisterUser,loginUser };
