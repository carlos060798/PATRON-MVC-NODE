// crear el token con jwt y manejar autentcacion 
import jwt from "jwt-simple";
import moment from "moment";

// crear el token
const generarToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //  momento de la creacion del token
        exp: moment().add(1, "days").unix(), // momento de expiracion del token
    };
    // devolver token codificado
    return jwt.encode(payload,process.env.JWT_SECRET);
}

export default generarToken;