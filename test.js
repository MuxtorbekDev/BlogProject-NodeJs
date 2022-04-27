const mongoose = require("mongoose");
const Post = require("./models/Post");

mongoose.connect(
  "mongodb+srv://Muxtorbek:MOPaLI2SN3RLBSO7@cluster0.5jeox.mongodb.net/Blogtest",
  () => {
    console.log("Connected to database");
  }
);

Post.find({}, (err, posts) => {
  console.log(err, posts);
});

// Post.create(
//   {
//     title: "My second post",
//     description: "My second description",
//     content: "Lorem second content",
//   },
//   (err, post) => {
//     console.log(err, post);
//   }
// );
