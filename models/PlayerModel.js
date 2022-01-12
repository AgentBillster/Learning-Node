const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const PlayerModel = mongoose.Schema(
  {
    email: { type: String, required: true, uniqueCaseInsensitive: true },
    username: { type: String },
    age: { type: Number },
    avatar: { type: String, required: false },
    role: { type: String, required: true },
    setup: { type: Boolean, required: true },
    games: { type: Object, default: {} },
    captain: { type: Object, default: {} },
  },
  { minimize: false },
  { versionKey: false }
);

PlayerModel.plugin(uniqueValidator, {
  message: "looks like {PATH} already exists",
});
module.exports = mongoose.model("Player", PlayerModel);
