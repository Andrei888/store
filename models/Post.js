import mongoose from "mongoose";
import User from "./User.js";

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  seo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: Map,
    of: String,
  },
});

export default mongoose.model("posts", postSchema);
