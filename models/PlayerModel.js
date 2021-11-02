const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const PlayerModel = mongoose.Schema(
  {
    email: { type: String, required: true, uniqueCaseInsensitive: true },
    picture: { type: String, required: false },
    role: { type: String, required: true },
    setup: { type: Boolean, required: true },
    captain: {
      captainField1: { type: String, required: false },
      captainField2: { type: String },
    },
  },
  { versionKey: false }
);

PlayerModel.plugin(uniqueValidator, {
  message: "looks like {PATH} already exists",
});
module.exports = mongoose.model("Player", PlayerModel);
