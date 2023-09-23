//  middleware de autenticacion
import jwt from "jwt-simple";
import moment from "moment";

// FUNCION PARA VALIDAR  EL TOKEN

const auth = (req, res, next) => {
    // comprobar si llega autorizacion

    if (!req.headers.authorization) {
        return res.status(403).json({ message: "No tienes autorizacion" });
    }

    // limpiar el token
    const token = req.headers.authorization.replace(/['"]+/g, "");

   try{
       // decodificar el token

     const  payload= jwt.decode(token, process.env.JWT_SECRET); 
        // comprobar si el token ha expirado

        if(payload.exp <= moment().unix()){
            return res.status(401).json({message: "El token ha expirado"});
        }
         // adjuntar usuario identificado a request
    req.user = payload;

   } catch (error) {
       console.log(error);
       return res.status(404).json({message: "El token no es valido",
    error});
   }

    // pasar a la accion
    next();
}



export default auth;