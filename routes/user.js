const express = require("express");
const User = require("../models/user");
const { Router } = express;

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({
      fullName: fullName,
      email: email,
      password: password,
    });
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);

  console.log("User", user);
  return res.redirect("/");
});

module.exports = router;
