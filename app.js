const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/authRoutes");
const utilRoutes = require("./routes/utilRoutes");
const playerRoutes = require("./routes/playerRoutes");

var cors = require("cors");

mongoose.connect(
  "mongodb+srv://admin-will:12920801@gamr.1fuwc.mongodb.net/gamr?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;

//set up routes
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRoutes);
app.use("/util", utilRoutes);
app.use("/player", playerRoutes);

module.exports = app;
