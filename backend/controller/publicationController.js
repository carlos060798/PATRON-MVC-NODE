// controladores de usuarios

import Publication from "../models/publicationModel.js";
import mongoosePaginate from 'mongoose-paginate-v2';


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
// obtener publicacion por id

const getPublicId = async (req, res) => {
    res.json({ message: "get public " });
};

export {
    createPublic,
    getpublicUserMe,
    deletePublic,
    getPublicId,
    getPublicdtail,
};
