import mongoose from "mongoose";
//modelo de datos almacenamiento
const StorageSchema = new mongoose.Schema(
  {
    Url: { type: String,
        },
    Filename: { type: String, 
        },
    
  },
  {
    timestamps: true, // createdAt, updatedAt
    versionKey: false, // __v
  }
);

export default mongoose.model("Storage", StorageSchema);