import bcrypt from "bcrypt";
import generarToken from "../../services/jwt.js";
import User from"../../models/userModel.js";
import { FollowthisUser } from "../../services/followuserId.js";
// Controlador para iniciar sesión de usuario
const loginUser = async (req, res) => {
  // Recoger datos
  const params = req.body;
  if (!params.email || !params.password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  try {
    // Buscar si existe el usuario
    const userexist = await User.findOne({ email: params.email })
    //.select({"password":0});
    if (!userexist) {
      return res.status(400).json({ message: "El usuario no existe" })
    }

    // Comprobar la contraseña
    const passwordCorrect = await bcrypt.compare(params.password, userexist.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "No te has identificado correctamente" })
    }
    // Crear token
    const token = generarToken(userexist);
    // Devolver respuesta

    return res.json({
      status:200,
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

// Controlador para obtener el perfil de un usuario
const profileUser = async (req, res) => {
  // Recoger el ID de la URL
  const id = req.params.id;

  // Consulta para sacar los datos del usuario
  const userProfile = await User.findById(id).select({ password: 0, role: 0 });
  if (!userProfile) {
    return res.status(404).send({
      status: "error",
      message: "El usuario no existe o hay un error",
    });
  }

  // Retornar los perfiles de usuarios seguidos y seguidores
  const followinfo = await FollowthisUser(req.user.id, id); 
  
  // Devolver el resultado
  return res.status(200).send({
    status: "success",
    user: userProfile,
    Profilefollowings:  followinfo.following,
    Profilefollowingsme:  followinfo.followers
  });
};

export { loginUser, profileUser };
