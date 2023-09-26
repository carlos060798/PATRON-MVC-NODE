// modelo de publicacion  (publicationModel.js)

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const publicationSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    file: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
publicationSchema.plugin(mongoosePaginate); // linea nesesaria para la paginacion de los usuarios

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;