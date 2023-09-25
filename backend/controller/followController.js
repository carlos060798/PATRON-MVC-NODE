/**
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: ID del usuario que sigue.
 *         followed:
 *           type: string
 *           description: ID del usuario seguido.
 *         createdAt:
 *           type: string
 *           description: Fecha de creación del seguimiento.
 *
 * /api/follows:
 *   post:
 *     summary: Crea un nuevo seguimiento.
 *     description: Crea un nuevo seguimiento de usuario.
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Datos para crear el seguimiento.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             followed:
 *               type: string
 *               description: ID del usuario a seguir.
 *     responses:
 *       201:
 *         description: Seguimiento creado con éxito.
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error en el servidor.
 *
 * /api/follows/{id}:
 *   delete:
 *     summary: Elimina un seguimiento.
 *     description: Elimina un seguimiento de usuario por ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del seguimiento a eliminar.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Seguimiento eliminado con éxito.
 *       404:
 *         description: Seguimiento no encontrado.
 *       500:
 *         description: Error en el servidor.
 *
 * /api/follows/following/{id}?page={page}:
 *   get:
 *     summary: Lista usuarios seguidos por un usuario.
 *     description: Obtiene una lista de usuarios seguidos por un usuario.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario cuyos seguidos se quieren listar.
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         description: Número de página para la paginación.
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidos obtenida con éxito.
 *       500:
 *         description: Error en el servidor.
 *
 * /api/follows/followers/{id}?page={page}:
 *   get:
 *     summary: Lista usuarios que siguen a un usuario.
 *     description: Obtiene una lista de usuarios que siguen a un usuario.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario cuyos seguidores se quieren listar.
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         description: Número de página para la paginación.
 *         type: integer
 *     responses:
 *       200:
 *         description: Lista de usuarios seguidores obtenida con éxito.
 *       500:
 *         description: Error en el servidor.
 */
import Follow from "../models/followModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';
import { followUserIds } from "../services/followuserId.js";

// Crea un nuevo seguimiento (follow)
const createFollow = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const params = req.body;

        // Obtener la identidad del usuario autenticado
        const identity = req.user;

        // Crear un objeto de seguimiento (follow) utilizando el modelo Follow
        const userToFollow = new Follow({
            user: identity.id,
            followed: params.followed
        });

        // Guardar el objeto de seguimiento en la base de datos
        const followStored = await userToFollow.save();

        if (!followStored) {
            // Manejar el caso en el que no se pudo crear el seguimiento
            return res.status(500).send({
                status: "error",
                message: "No se ha podido seguir al usuario"
            });
        }

        // Responder con éxito
        return res.status(201).send({
            status: "success",
            identity: req.user,
            follow: followStored
        });
    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor"
        });
    }
};

// Lista usuarios seguidos por cualquier usuario
const getFollowing = async (req, res) => {
    try {
        // Obtener el ID del usuario actual
        let userId = req.user.id;
        
        // Comprobar si llega un ID de usuario diferente por la URL
        if (req.params.id) userId = req.params.id;
        
        // Comprobar si llega la página por la URL, si no, por defecto es 1
        let page = 1;
        if (req.query.page) page = parseInt(req.query.page);
        
        const itemsPerPage = 5;

        // Configuración de la paginación utilizando mongoose-paginate-v2 y mantener la población
        const options = {
            page: page,
            limit: itemsPerPage,
            customLabels: {
                totalDocs: 'totalUsers',
                docs: 'users'
            },
            populate: [
                {
                    path: 'user',
                    select: '-password -role -__v -email'
                },
                {
                    path: 'followed',
                    select: '-password -role -__v -email'
                }
            ]
        };

        // Obtener la lista de usuarios seguidos por el usuario con ID 'userId'
        const followings = await Follow.paginate({ user: userId }, options); 

        // Obtener la lista de usuarios que sigues y los que te siguen
        let   user_followings = followUserIds(req.user.id);
        
        // Responder con los resultados
        res.json({
            message: "Usuarios seguidos",
            totalUsers: followings.totalUsers,
            totalPages: followings.totalPages,
            currentPage: followings.page,
            users: followings.users,
            userfollowings: (await user_followings).following,
            userfollowingsme: (await user_followings).followers
        });

    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Lista usuarios que siguen a cualquier usuario
const getFollowers = async (req, res) => {
    try {
        // Obtener el ID del usuario actual
        let userId = req.user.id;
        
        // Comprobar si llega un ID de usuario diferente por la URL
        if (req.params.id) userId = req.params.id;
        
        // Comprobar si llega la página por la URL, si no, por defecto es 1
        let page = 1;
        if (req.query.page) page = parseInt(req.query.page);
        
        const itemsPerPage = 5;

        // Configuración de la paginación utilizando mongoose-paginate-v2 y mantener la población
        const options = {
            page: page,
            limit: itemsPerPage,
            customLabels: {
                totalDocs: 'totalUsers',
                docs: 'users'
            },
            populate: [
                {
                    path: 'user',
                    select: '-password -role -__v -email'
                },
                {
                    path: 'followed',
                    select: '-password -role -__v -email'
                }
            ]
        };

        // Obtener la lista de usuarios que siguen al usuario con ID 'userId'
        const followings = await Follow.paginate({ followed: userId }, options); 

        // Obtener la lista de usuarios que sigues y los que te siguen
        let   user_followings = followUserIds(req.user.id);
        
        // Responder con los resultados
        res.json({
            message: "Usuarios que me siguen",
            totalUsers: followings.totalUsers,
            totalPages: followings.totalPages,
            currentPage: followings.page,
            users: followings.users,
            userfollowings: (await user_followings).following,
            userfollowingsme: (await user_followings).followers
        });

    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// Elimina un seguimiento (follow) por ID
const deleteFollow = async (req, res) => {
    try {
        // Obtener el ID del usuario autenticado
        const identity = req.user.id;

        // Obtener el ID del seguimiento a eliminar
        const followId = req.params.id;

        // Buscar el seguimiento y eliminarlo
        const follow = await Follow.findByIdAndDelete(followId);

        if (!follow) {
            // Manejar el caso en el que el seguimiento no se encuentra
            return res.status(404).json({
                message: "Seguimiento no encontrado"
            });
        }

        // Responder con éxito
        res.json({
            message: "Seguimiento eliminado con éxito",
            identity,
            followId,
            follow,
        });
    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export { getFollowers, createFollow, deleteFollow, getFollowing };
