import Follow from "../models/followModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';
import { followUserIds } from "../services/followuserId.js";




// crear follow
const createFollow = async (req, res) => {
    try {
        // Conseguir datos por body
        const params = req.body;

        // Sacar id del usuario identificado
        const identity = req.user;

        // Crear objeto con modelo follow
        const userToFollow = new Follow({
            user: identity.id,
            followed: params.followed
        });

        // Guardar objeto en la base de datos
        const followStored = await userToFollow.save();

        if (!followStored) {
            return res.status(500).send({
                status: "error",
                message: "No se ha podido seguir al usuario"
            });
        }

        return res.status(200).send({
            status: "success",
            identity: req.user,
            follow: followStored
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor"
        });
    }
};



// listar  usuarios seguidos por cualquier usuario 
const getFollowing = async (req, res) => {
    try {
        // Obtener el ID del usuario actual
        let userId = req.user.id;
        
        // Comprobar si llega un ID de usuario diferente por la URL
        if (req.params.id) userId = req.params.id;
        
        // Comprobar si llega la página por la URL, si no, por defecto es 1
        let page = 1;
        if (req.params.page) page = req.params.page;
        
        const itemsPerPage = 5;

        // Aplicar la paginación utilizando mongoose-paginate-v2 y mantener la población
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

        const followings = await Follow.paginate({ user: userId }, options); 

        // sacar una lista de usuarios seguidos y los que  me siguen
        let   user_followings=  followUserIds(req.user.id);
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
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

// listar  usuarios que siguen a cualquier usuario
const getFollowers = async (req, res) => {


    // sacar id de usuario identificado





    res.json({ message: "get followers users" });
};




// eliminar follow
const deleteFollow = async (req, res) => {
    // sacar id de usuario identificado
    const identity = req.user.id;
    // conseguir id de follow a eliminar
    const followId = req.params.id;

    // buscar follow y eliminarlo

    const follow = await Follow.findOneAndDelete(followId);

    res.json({
        message: "delete follow",
        identity,
        followId,
        follow,
    });
};

export { getFollowers, createFollow, deleteFollow, getFollowing };
