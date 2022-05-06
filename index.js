const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");
const homePageController = require("./controllers/homePage");
const createPostController = require("./controllers/createPost");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const aboutPageController = require("./controllers/aboutPage");
const contactPageController = require("./controllers/contactPage");
const {
  vailDateCreatePostMiddleware,
} = require("./middlewares/vailDateCreatePost");
const app = express();

mongoose.connect(
  "mongodb+srv://Muxtorbek:MOPaLI2SN3RLBSO7@cluster0.5jeox.mongodb.net/Node-Blog",
  () => {
    console.log("Connected to database");
  }
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", `${__dirname}/views`);

app.get("/", homePageController);
app.get("/about", aboutPageController);
app.get("/contact", contactPageController);
app.get("/post/new", postsNewController);
app.post("/post/create", vailDateCreatePostMiddleware, createPostController);
app.get("/post/:id", getPostsController);

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err });
  next();
});
app.listen(5001, () => {
  console.log("Server has started on Port 5001...");
});
