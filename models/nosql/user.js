import mongoose from "mongoose";
//modelo de datos user
const userSchema = new mongoose.Schema(
  {
    name: { type: String,
         required: true },
    email: { type: String, 
        unique: true, 
        required: true },
    age: { type: String,
         require: true },
    roles: { type: ["user", "admin"],
     default: "user" },
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
  }
);

export default mongoose.model("Users", userSchema);