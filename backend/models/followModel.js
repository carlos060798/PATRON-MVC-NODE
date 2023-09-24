import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  followed: { type: mongoose.Schema.ObjectId, ref: "User" },
  create_at: { type: Date, default: Date.now() },
});

export default mongoose.model("Follow", followSchema);
