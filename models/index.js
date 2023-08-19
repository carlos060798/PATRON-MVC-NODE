// archivo para manejar los modelos de la base de datos no relacional

import User from "./nosql/user.js"
import  Tracks from "./nosql/track.js"
import Storage from "./nosql/storage.js"


// exportar los modelos
const Models={
    USERMODEL:User,
    TRACKSMODEL:Tracks,
     STORAGEMODEL: Storage

}

export default Models;