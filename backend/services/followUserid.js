//  middleware  para   sacar los id de los usuarios apra tratar la informacion
import Follow from "../models/followModel.js";

const followUserIds = async (identityuserId) => { // funcion para verficar que usuarios sigo y cuales me siguen 
 // sacar la informacion de seguidos y mis seguidores
    let following = await Follow.find({ user: identityuserId }).select({ followed:1 ,_id:0}).exec()

    let followers = await Follow.find({ followed: identityuserId }).select({ user:1 ,_id:0}).exec()
  // limpiar informacion con numero solamente
  let followingclean=[]

    following.forEach((follow)=>{
        followingclean.push(follow.followed)
    })
  
    let followersclean=[]
    followers.forEach((follow)=>{
        followersclean.push(follow.user)
    })

  return  {
        following: followingclean,
        followers: followersclean
    };
  }




const FollowthisUser = async (identityuserId,profaileUserId) => { // funcion para sacar la informacion de los usuarios que me siguen
     console.log({
        identityuserId,
        profaileUserId
     })
    // sacar la informacion de seguidos y mis seguidores
    let following = await Follow.findOne({ user: identityuserId, followed:profaileUserId })

    let followers = await Follow.findOne({ user : profaileUserId,  followed: identityuserId })
   
    return  {
    following,
    followers
    };
}

export {
    followUserIds,
    FollowthisUser
};