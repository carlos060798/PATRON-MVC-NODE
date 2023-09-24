import Follow from "../models/followModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';



// crear follow

const createFollow = async (req, res) => {
    // conseguir datos por body
    const params = req.body; // sacar id de usuario a seguir

    // sacar id de usuario identificado
    const identity = req.user;

    // crear objeto a guardar
    const userFollow = new Follow({
        user: identity.id,
        followed: params.followed,
    });

    // guauserFollow
    const followStored = await userFollow.save();

    res.json({
        message: "create follow",
        identity: req.user,
        followStored,
    });
};

// listar  usuarios seguidos por cualquier usuario 
const getFollowing = async (req, res) => {

    // sacar id de usuario identificado
    let userId = req.user.id;

    // comprobar si llega un id por la url
    if (req.params.id) userId = req.params.id;

    // comprobar si llega la page por la url, si no es asi por defecto es 1
    let page = 1;

    if (req.params.page) page = req.params.page;
    try {
        const itemsPerPage = 5;
        const followings = await Follow.find({ user: userId });

        res.json({ message: "get following users", followings });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error en el servidor", error });
    }

}

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
