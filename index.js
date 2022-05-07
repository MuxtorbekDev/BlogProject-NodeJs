const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");

const homePageController = require("./controllers/homePage");
const createPostController = require("./controllers/createPost");
const getPostsController = require("./controllers/getPosts");
const postsNewController = require("./controllers/postsNew");
const aboutPageController = require("./controllers/aboutPage");
const contactPageController = require("./controllers/contactPage");
const createUserController = require("./controllers/createUser");
const userStoreController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const app = express();

const { vailDatePost } = require("./middlewares/vailDatePost");

// connect to mongo
const MongoUrl =
  "mongodb+srv://Muxtorbek:MOPaLI2SN3RLBSO7@cluster0.5jeox.mongodb.net/Node-Blog";
mongoose.connect(MongoUrl, () => {
  console.log("Connected to database");
});

app.use(
  expressSession({
    secret: "muxtorbek",
    store: mongoStore.create({ mongoUrl: MongoUrl }),
  })
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
app.post("/post/create", vailDatePost, createPostController);
app.get("/post/:id", getPostsController);
app.get("/reg", createUserController);
app.post("/auth/reg", userStoreController);
app.get("/login", loginController);
app.post("/auth/log", loginStoreController);

// ...
app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err });
  next();
});
app.listen(5001, () => {
  console.log("Server has started on Port 5001...");
});
