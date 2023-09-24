import multer from 'multer';

// configuracion de la subida de archivos

const   storage = multer.diskStorage({
    destination: function(req, file, cb){ // destino de la imagen
        cb(null, './uploads/users');
    },
    filename: function(req, file, cb){ // nombre de la imagen
        cb(null,"avatar-"+Date.now() + file.originalname);
    }
});

// midleware para subir archivos
const  uploads= multer({storage});


export default uploads;