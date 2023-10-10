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
        return res.status(200).send({
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
/*const getFollowing = async (req, res) => {
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
        let user_followings = followUserIds(req.user.id);

        // Responder con los resultados
        res.json({
            message: "Usuarios seguidos",
            totalUsers: followings.totalUsers,
            totalPages: followings.totalPages,
            currentPage: followings.page,
            users: followings.users,
            followings: (await user_followings).following,
            followingsme: (await user_followings).followers
        });

    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
*/
const getFollowing = async (req, res) => {
    try {
        // Obtener el ID del usuario actual
        let userId = req.user.id;

        // Comprobar si llega un ID de usuario diferente por la URL
        if (req.params.id) userId = req.params.id;

        // Configuración de la población sin límite de paginación
        const options = {
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

        // Obtener la lista completa de usuarios seguidos por el usuario con ID 'userId'
        const followings = await Follow.find({ user: userId }).populate(options.populate);

        // Obtener la lista de IDs de usuarios seguidos y seguidores
        let user_followings = followUserIds(req.user.id);

        // Responder con los resultados
        res.json({
            message: 'Usuarios seguidos',
            totalUsers: followings.length,
            users: followings,
            followings: (await user_followings).following,
            followingsme: (await user_followings).followers
        });
    } catch (error) {
        // Manejar errores del servidor
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
// Lista usuarios que siguen a cualquier usuario
/*
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
        let user_followings = followUserIds(req.user.id);

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
*/
const getFollowers = async (req, res) => {
    try {
        // Obtener el ID del usuario actual
        let userId = req.user.id;

        // Comprobar si llega un ID de usuario diferente por la URL
        if (req.params.id) userId = req.params.id;

        // Configuración de la población sin límite de paginación
        const options = {
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

        // Obtener la lista completa de usuarios que siguen al usuario con ID 'userId'
        const followings = await Follow.find({ followed: userId }).populate(options.populate);

        // Obtener la lista de IDs de usuarios que sigues y te siguen
        const user_followings = followUserIds(req.user.id);

        // Responder con los resultados
        res.json({
            message: "Usuarios que me siguen",
            totalUsers: followings.length,
            users: followings,
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
        // Recoger el id del usuario identificado
        const userId = req.user.id;

        // Recoger el id del usuario que sigo y quiero dejar de seguir
        const followedId = req.params.id;

        // Encontrar y eliminar el seguimiento
        const deleteResult = await Follow.deleteOne({ user: userId, followed: followedId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).send({
                status: "error",
                message: "No estás siguiendo a este usuario"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Dejaste de seguir al usuario correctamente"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor", error });
    }
};


export { getFollowers, createFollow, deleteFollow, getFollowing };
