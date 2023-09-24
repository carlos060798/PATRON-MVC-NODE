import bcrypt from "bcrypt";
import generarToken from "../../services/jwt.js";
import User from"../../models/userModel.js";


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

export { loginUser, profileUser };