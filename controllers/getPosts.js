const Post = require("../models/Post");

module.exports = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render("post", { post });
};
