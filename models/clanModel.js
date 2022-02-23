const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const ClanModel = mongoose.Schema(
    {
        name: { type: String, uniqueCaseInsensitive: true },
        game: { type: String, },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
    },
    { minimize: false },
    { versionKey: false }
);

ClanModel.plugin(uniqueValidator, {
    message: "looks like {PATH} already exists",
});
module.exports = mongoose.model("Clan", ClanModel);
