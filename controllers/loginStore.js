const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    } else {
      return res.redirect("/login");
    }
  });
  // try to find user
  // compare user password
  // if user is correct, then login
  // else
  // redirect to login page
};
