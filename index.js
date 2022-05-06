const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const fileUpload = require("express-fileupload");

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

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
  // console.log(posts);
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/create", (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "public/images", image.name), (err) => {
    if (err) {
      console.log(err);
    }
    Post.create(
      { ...req.body, image: `/images/${image.name}` },
      (err, post) => {
        res.redirect("/");
      }
    );
  });
});

app.get("/post/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render("post", { post });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err });
  next();
});

app.listen(5001, () => {
  console.log("Server has started on Port 5001...");
});
