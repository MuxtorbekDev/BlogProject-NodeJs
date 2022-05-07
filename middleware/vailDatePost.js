const vailDatePost = (req, res, next) => {
  if (
    !(req.files && req.files.image) ||
    !req.body.title ||
    !req.body.content ||
    !req.body.description
  ) {
    return res.redirect("/post/new");
  }
  next();
};

module.exports = { vailDatePost };
