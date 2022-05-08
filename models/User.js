const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Iltimos  Username kiriting"],
  },
  email: {
    type: String,
    required: [true, "Iltimos  Email kiriting"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Iltimos  Password kiriting"],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
