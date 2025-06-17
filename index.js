const express = require("express");
const app = express();
const connectionFunction = require("./utils/connection");
const user = require("./models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

connectionFunction();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs")

// isLoggedIn

function isLoggedIn(req, res, next) {
  try {
    const decoded = jwt.verify(req.cookies.token, "shhhhh");
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/login");
  }
}

// profile route

app.get("/profile", isLoggedIn, async (req, res) => {
    // becuase we had set user in isLoggedIn user using the data given to jwt i.e email
  let { email } = req.user;
  let result = await user.findOne({ email });
  res.render("profile.ejs", {result});
});

// sign In route

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {
  let { name, password, email } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      await user.create({ name, password: hash, email });
      const token = jwt.sign({ email }, "shhhhh");
      res.cookie("token", token);
      res.redirect("/profile");
    });
  });
});

// login route

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let result = await user.findOne({ email });

  if (!result) return res.redirect("/login");

  bcrypt.compare(password, result.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email }, "shhhhh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

// logout route

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.render("login.ejs");
});

// create post

app.listen(3000, console.log("listening at 3000"));
