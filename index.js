const express = require("express");
const path = require("path");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();

mongoose.connect(
  "mongodb+srv://Muxtorbek:MOPaLI2SN3RLBSO7@cluster0.5jeox.mongodb.net/Node-Blog",
  () => {
    console.log("Connected to database");
  }
);

app.use(express.static("public"));
app.use(expressEdge.engine);
app.set("views", `${__dirname}/views`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// app.get("/post/:id", async (req, res) => {
//   const post = await Post.findById(req.params.id);
//   console.log(req.params);
//   res.render("post", { post });
// });

app.get("/post/new", (req, res) => {
  res.render("create");
});

app.post("/post/create", (req, res) => {
  Post.create(req.body, (err, post) => {
    res.redirect("/");
  });
});

app.listen(5001, () => {
  console.log("Server has started on Port 5001...");
});
