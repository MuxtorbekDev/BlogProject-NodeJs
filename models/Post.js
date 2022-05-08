const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  content: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
