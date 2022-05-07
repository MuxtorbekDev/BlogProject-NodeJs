module.exports = (req, res) => {
  console.log(req.session.userId);

  if (req.session.userId) {
    console.log(req.session.userId);
    return res.render("create");
  }
  res.redirect("/login");
};
