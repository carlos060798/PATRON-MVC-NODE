import Follow from "../models/followModel.js";

const getFollowers = async (req, res) => {
  res.json({ message: "get followers" });
};

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

// listar follows

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

export { getFollowers, createFollow, deleteFollow };
