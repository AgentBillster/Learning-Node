const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userModel = mongoose.Schema({
  userName: { type: String, required: true, uniqueCaseInsensitive: true },
  displayName: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
});

userModel.plugin(uniqueValidator, {
  message: "looks like {PATH} already exists",
});
module.exports = mongoose.model("User", userModel);
