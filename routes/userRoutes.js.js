const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/userModel");

router.post("/signup", (req, res, next) => {
  const user = new User({
    userName: req.body.username,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User created!",
        jdasd: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
