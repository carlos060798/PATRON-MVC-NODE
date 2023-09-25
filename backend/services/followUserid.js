//  middleware  para   sacar los id de los usuarios apra tratar la informacion
import Follow from "../models/followModel.js";

// Función para obtener los IDs de los usuarios seguidos y seguidores
const followUserIds = async (identityUserId) => {
    // Sacar la información de los usuarios seguidos y seguidores
    let following = await Follow.find({ user: identityUserId }).select({ followed: 1, _id: 0 }).exec();
    let followers = await Follow.find({ followed: identityUserId }).select({ user: 1, _id: 0 }).exec();

    // Limpiar la información para obtener solo los IDs
    let followingIds = [];
    following.forEach((follow) => {
        followingIds.push(follow.followed);
    });

    let followersIds = [];
    followers.forEach((follow) => {
        followersIds.push(follow.user);
    });

    return {
        following: followingIds,
        followers: followersIds
    };
}

// Función para obtener la información de si un usuario sigue a otro
const FollowthisUser = async (identityUserId, profileUserId) => {
    // Sacar la información de si el usuario sigue al perfil y viceversa
    let following = await Follow.findOne({ user: identityUserId, followed: profileUserId });
    let followers = await Follow.findOne({ user: profileUserId, followed: identityUserId });

    return {
        following,
        followers
    };
}

export {
    followUserIds,
    FollowthisUser
};
