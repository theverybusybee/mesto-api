import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Card } from "types/card";
const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: Array<ObjectId>,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Card>("card", cardSchema);
