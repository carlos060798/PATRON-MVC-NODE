import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';


const followSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  followed: { type: mongoose.Schema.ObjectId, ref: "User" },
  create_at: { type: Date, default: Date.now() },
});

followSchema.plugin(mongoosePaginate); // linea nesesaria para la paginacion de los usuarios
export default mongoose.model("Follow", followSchema);
