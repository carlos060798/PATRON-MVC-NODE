/**
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario.
 *         nick:
 *           type: string
 *           description: Nickname del usuario.
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         createdAt:
 *           type: string
 *           description: Fecha de creación del usuario.
 *
 * /api/users:
 *   get:
 *     summary: Obtiene una lista de usuarios.
 *     description: Obtiene una lista de usuarios paginada.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página para la paginación.
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       404:
 *         description: No se han encontrado usuarios.
 *       500:
 *         description: Error en el servidor.
 *
 *   post:
 *     summary: Registra un nuevo usuario.
 *     description: Registra un nuevo usuario en el sistema.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Datos del usuario a registrar.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error en el servidor.
 *
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario.
 *     description: Actualiza un usuario por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a actualizar.
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         description: Datos del usuario a actualizar.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       400:
 *         description: Error en los datos de entrada.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generarToken from "../services/jwt.js";
import mongoosePaginate from "mongoose-paginate-v2";
import Follow from "../models/followModel.js";
import Publication from "../models/publicationModel.js";
import { followUserIds } from "../services/followuserId.js";

// Obtiene una lista de usuarios paginada
const getUsers = async (req, res) => {
  try {
    const defaultPage = 1;
    const page = req.params.page ? parseInt(req.params.page) : defaultPage;
    const itemsPerPage = 5;

    const options = {
      page,
      limit: itemsPerPage,
      sort: { _id: -1 },
      select: '-email -password -role -__v', // Excluye los campos especificados
      collation: {
        locale: "en",
      },
    };

    const users = await User.paginate({}, options);

    if (users.docs.length === 0) {
      return res.status(404).json({
        status: "Error",
        msg: "No se han encontrado usuarios",
      });
    }

    // Obtiene la lista de usuarios que sigues y los que te siguen
    let user_followings = followUserIds(req.user.id);

    return res.status(200).json({
      status: "success",
      msg: "Listado de usuarios",
      users: users.docs,
      page,
      itemsPerPage,
      totalUsers: users.totalDocs, // Agregar el total de usuarios
      userfollowings: (await user_followings).following,
      userfollowingsme: (await user_followings).followers
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Error",
      msg: "Hubo un error al obtener los usuarios",
      error: error.msg,
    });
  }
};

// Registra un nuevo usuario en el sistema
const RegisterUser = async (req, res) => {
  try {
    // Recoger datos del usuario
    const params = req.body;

    // Validar datos
    if (!params.name || !params.nick || !params.email || !params.password) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Validar si el usuario existe
    const existingUser = await User.findOne({
      $or: [{ email: params.email.toLowerCase() }, { nick: params.nick.toLowerCase() }],
    });

    if (existingUser) {
      return res.json({ msg: "El usuario ya existe" });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    params.password = await bcrypt.hash(params.password, salt);

    // Guardar usuario
    const userNew = new User(params);
    await userNew.save();

    // Devolver respuesta
    return res.json({
      msg: "Usuario creado correctamente",
      status: "200",
      userNew,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al guardar el usuario", error: error.msg });
  }
};

// Actualiza un usuario por ID
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
    }else{
      delete resto.password;    }

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

const counterUsers = async (req, res) => {
  let userId = req.user.id;

  if (req.params.id) {
      userId = req.params.id;
  }

  try {
      const following = await Follow.count({ "user": userId });

      const followed = await Follow.count({ "followed": userId });

      const publications = await Publication.count({ "user": userId });

      return res.status(200).send({
          userId,
          following: following,
          followed: followed,
          publications: publications
      });
  } catch (error) {
      return res.status(500).send({
          status: "error",
          msg: "Error en los contadores",
          error
      });
  }
  }









export { getUsers, RegisterUser, updateUser,counterUsers };


