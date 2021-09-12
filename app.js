const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes.js");
const passport = require("passport");
var cors = require("cors");

mongoose.connect(
  "mongodb+srv://billy:oBebnbBBVcFCWJdA@node-test.1fuwc.mongodb.net/node-test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;

app.set("view engine", "ejs");
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

module.exports = app;
