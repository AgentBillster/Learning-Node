const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const GamesModel = mongoose.Schema(
  {
    name: { type: String, required: true, uniqueCaseInsensitive: true },
    image: { type: String, required: false },
  },
  { versionKey: false }
);

GamesModel.plugin(uniqueValidator, {
  message: "looks like {PATH} already exists",
});
module.exports = mongoose.model("Game", GamesModel);
