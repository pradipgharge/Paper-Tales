const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/paper-tales")
  .then((e) => console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server started at PORT: " + PORT);
});
