// Importar los módulos y dependencias necesarias
import Publication from "../models/publicationModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';
import { followUserIds } from "../services/followuserId.js";

// Definir función para crear una nueva publicación
const createPublic = async (req, res) => {
    try {
        // Recibir datos de la publicación desde el cuerpo de la solicitud
        const params = req.body;

        if (!params.text)
            return res
                .status(400)
                .json({ message: "El texto de la publicación es requerido" });

        // Crear un objeto del modelo de Publicación
        const newpublication = new Publication(params);
        // Asignar el usuario actual a la publicación
        newpublication.user = req.user.id;
        // Guardar la publicación en la base de datos
        const publicationSaved = await newpublication.save();
        // Devolver una respuesta
        if (!publicationSaved)
            return res
                .status(200)
                .json({ message: "No se pudo guardar la publicación" });
        return res.status(200).json({
            Msg: "Publicación creada",
            publicationSaved,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error al guardar la publicación", error });
    }
};

// Definir función para obtener los detalles de una publicación por su ID
const getPublicdtail = async (req, res) => {
    try {
        // Recoger el ID de la publicación desde los parámetros de la solicitud
        const publicId = req.params.id;

        // Buscar la publicación en la base de datos por su ID
        const publicDetail = await Publication.findById(publicId);

        if (!publicDetail)
            return res.status(404).json({ message: "Publicación no encontrada" });

        // Devolver el resultado
        return res.status(200).json({
            message: "Publicación encontrada",
            publicDetail,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error al obtener la publicación", error });
    }
};

// Definir función para obtener las publicaciones de un usuario por su ID
const getpublicUserMe = async (req, res) => {
    try {
        // Sacar el ID de usuario desde los parámetros de la solicitud
        const userId = req.params.id;

        // Controlar la página actual
        let page = 1;

        if (req.params.page) page = parseInt(req.params.page);

        const itemsPerPage = 5;

        // Opciones de paginación
        const options = {
            page,
            limit: itemsPerPage,
            sort: { created_at: -1 }, // Cambiar a "created_at" si ese es el campo de ordenamiento correcto
        };

        // Buscar publicaciones del usuario utilizando mongoose-paginate-v2
        const query = { user: userId }; // Filtro de búsqueda
        const result = await Publication.paginate(query, options);

        if (!result.docs || result.docs.length <= 0) {
            return res.status(404).json({
                status: "error",
                message: "No hay publicaciones para mostrar",
            });
        }

        // Utilizar el método populate para obtener los datos del usuario
        await Publication.populate(result.docs, { path: 'user', select: '-password -__v -role -email' });

        return res.status(200).json({
            status: "success",
            message: "Publicaciones del perfil de un usuario",
            page: result.page,
            total: result.totalDocs,
            pages: result.totalPages,
            publications: result.docs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener publicaciones del usuario",
            error: error.message,
        });
    }
};

// Definir función para eliminar una publicación por su ID
const deletePublic = async (req, res) => {
    try {
        const publicId = req.params.id;

        // Buscar la publicación por su ID y eliminarla
        const deletePublic = await Publication.findByIdAndDelete(publicId);

        if (!deletePublic) return res.status(404).json({ message: "Publicación no encontrada" });

        // Devolver el resultado
        return res.status(200).json({
            message: "Publicación eliminada",
            deletePublic
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Error al eliminar la publicación", e });
    }
};

// Definir función para obtener el feed de publicaciones
const publicFeed = async (req, res) => {
    try {
        let page = 1;
        const itemsPerPage = 5;

        if (req.params.page) {
            page = parseInt(req.params.page);
        }

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        const totalPublications = await Publication.countDocuments();

        if (startIndex >= totalPublications) {
            return res.status(200).json({
                status: 'success',
                message: 'No hay más publicaciones para mostrar.',
                publications: [],
            });
        }

        let publications = await Publication.find()
            .skip(startIndex)
            .limit(itemsPerPage)
            .populate('user', '-password -role -__v -email')
            .sort('-created_at');

        return res.status(200).json({
            status: 'success',
            message: 'Feed de publicaciones',
            total: totalPublications,
            page: page,
            pages: Math.ceil(totalPublications / itemsPerPage),
            publications: publications,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener las publicaciones.',
            error: error.message,
        });
    }
};
/*const publicFeed = async (req, res) => {
     // Sacar la página actual
     let page = 1;

     if (req.params.page) {
         page = req.params.page;
     }
 
     // Establecer número de elementos por página
     const itemsPerPage = 5;
 
     // Sacar un array de identificadores de usuarios a los que el usuario logueado sigue
     try {
         const myFollows = await followUserIds(req.user.id);
 
         // Encontrar publicaciones de los usuarios seguidos, ordenarlas, popularlas y paginarlas
         const query = Publication.find({ user: { $in: myFollows.following } })
             .populate("user", "-password -role -__v -email")
             .sort("-created_at");
 
         const options = {
             page: page,
             limit: itemsPerPage,
         };
 
         const publications = await Publication.paginate(query, options);
         console.log(publications);
 
         if (!publications || publications.docs.length === 0) {
             return res.status(500).send({
                 status: "error",
                 message: "No hay publicaciones para mostrar",
             });
         }
 
         return res.status(200).send({
             status: "success",
             message: "Feed de publicaciones",
             following: myFollows.following,
             total: publications.totalDocs,
             page: publications.page,
             pages: publications.totalPages,
             publications: publications.docs,
         });
     } catch (error) {
         return res.status(500).send({
             status: "error",
             error,
             message: "Error al obtener usuarios que sigues",
         });
     }
};*/

// Exportar las funciones para su uso en otras partes de la aplicación
export {
    createPublic,
    getpublicUserMe,
    deletePublic,
    publicFeed,
    getPublicdtail,
};

/*
* en caso de que no sirva el codigo descomentar este
/ controladores de las publicaciones de usuarios

import Publication from "../models/publicationModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';
import { followUserIds } from "../services/followuserId.js";



// crear el publicacion

const createPublic = async (req, res) => {
    try {
        // recibir  datos el publicacion
        const params = req.body;

        if (!params.text)
            return res
                .status(400)
                .json({ message: "texto de la publicacion es requerido" });

        // crear objeto del modelo publicacion

        const newpublication = new Publication(params);
        // asignar el usuario
        newpublication.user = req.user.id;
        // guardar el publicacion en la base de datos
        const publicationSaved = await newpublication.save();
        // devolver respuesta
        if (!publicationSaved)
            return res
                .status(200)
                .json({ message: "no se pudo guardar la publicacion" });
        return res.status(200).json({
            Msg: "Publicacion creada",
            publicationSaved,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error al guardar la publicacion", error });
    }
};

// Detail de las publicaciones

const getPublicdtail = async (req, res) => {
    try {
        // recoger id del publicacion

        const publicId = req.params.id;

        // buscar el publicacion

        const publicDetail = await Publication.findById(publicId);

        if (!publicDetail)
            return res.status(404).json({ message: "publicacion no encontrada" });

        // devolver el resultado

        return res.status(200).json({
            message: "publicacion encontrada",
            publicDetail,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error al obtener la publicacion", error });
    }
};

// actualizar publicacion

const getpublicUserMe = async (req, res) => {
    try {
        // Sacar el id de usuario
        const userId = req.params.id;

        // Controlar la pagina
        let page = 1;

        if (req.params.page) page = parseInt(req.params.page);

        const itemsPerPage = 5;

        // Opciones de paginación
        const options = {
            page,
            limit: itemsPerPage,
            sort: { created_at: -1 }, // Cambia a "created_at" si ese es el campo de ordenamiento correcto
        };

        // Buscar publicaciones del usuario utilizando mongoose-paginate-v2
        const query = { user: userId }; // Filtro de búsqueda
        const result = await Publication.paginate(query, options);

        if (!result.docs || result.docs.length <= 0) {
            return res.status(404).json({
                status: "error",
                message: "No hay publicaciones para mostrar",
            });
        }

        // Utiliza el método populate para obtener los datos del usuario
        await Publication.populate(result.docs, { path: 'user', select: '-password -__v -role -email' });

        return res.status(200).json({
            status: "success",
            message: "Publicaciones del perfil de un usuario",
            page: result.page,
            total: result.totalDocs,
            pages: result.totalPages,
            publications: result.docs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener publicaciones del usuario",
            error: error.message,
        });
    }
    };
// eliminar publicacion

const deletePublic = async (req, res) => {
    try {
        const publicId = req.params.id;

        // buscar el publicacion
        const deletePublic = await Publication.findByIdAndDelete(publicId);

        if (!deletePublic) return res.status(404).json({ message: "publicacion no encontrada" });

        // devolver el resultado
        return res.status(200).json({
            message: "publicacion eliminada",
            deletePublic

        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Error al eliminar la publicacion", e });
    }

};


// feed de las publicaciones

const publicFeed = async (req, res) => {
     // Sacar la pagina actual
     let page = 1;

     if (req.params.page) {
         page = req.params.page;
     }
 
     // Establecer numero de elementos por pagina
     const itemsPerPage = 5;
 
     // Sacar un array de identificadores de usuarios que yo sigo como usuario logueado
     try {
         const myFollows = await followUserIds(req.user.id);
 
         // Find a publicaciones in, ordenar, popular, paginar
         const query = Publication.find({ user: { $in: myFollows.following } })
             .populate("user", "-password -role -__v -email")
             .sort("-created_at");
 
         const options = {
             page: page,
             limit: itemsPerPage,
         };
 
         const publications = await Publication.paginate(query, options);
 
         if (!publications || publications.docs.length === 0) {
             return res.status(500).send({
                 status: "error",
                 message: "No hay publicaciones para mostrar",
             });
         }
 
         return res.status(200).send({
             status: "success",
             message: "Feed de publicaciones",
             following: myFollows.following,
             total: publications.totalDocs,
             page: publications.page,
             pages: publications.totalPages,
             publications: publications.docs,
         });
     } catch (error) {
         return res.status(500).send({
             status: "error",
             error,
             message: "Error al obtener usuarios que sigues",
         });
     }
};

export {
    createPublic,
    getpublicUserMe,
    deletePublic,
    publicFeed,
    getPublicdtail,
};
*/