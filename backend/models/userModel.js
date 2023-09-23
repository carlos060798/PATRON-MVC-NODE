import moongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname:  String,
    nick:{
        type: String,
        required: true
    },
    email: {
    type: String,
    required: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: 'role_user'
    },
    image:{
        type: String,
        default: "image.png"
    },

    create_at: {
        type: Date,
        default: Date.now()
    }

    
  
});

userSchema.plugin(mongoosePaginate); // linea nesesaria para la paginacion de los usuarios
export default moongoose.model('User', userSchema);