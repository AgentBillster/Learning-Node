const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = require("express").Router();
const passport = require("passport");
const Player = require("../models/PlayerModel");
const Game = require("../models/GamesModel");
const { uploadFile } = require("../s3");
const geolib = require('geolib');
require("dotenv").config();
const s3 = require("aws-sdk/clients/s3");

const s3bucket = new s3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: "us-east-2",
});

router.post("/createUser", async (req, res) => {
  const { id, setupInfo } = req.body;
  const base64Data = Buffer.from(setupInfo.playerImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  let imageUrl = ""
  await s3bucket.upload(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: id, // the key for S3 location 
      Body: base64Data, // bytearray
      ContentEncoding: 'base64', // important to tell that the incoming buffer is base64
      ContentType: "image/jpeg", // e.g. "image/jpeg" or "image/png"
    },
  ).promise().then(res => {
    // using promise gives me the lcoation of the url ??
    imageUrl = res.Location
  })

  Player.findOne({ _id: id })
    .then((player) => {
      player.age = setupInfo.age;
      player.avatar = imageUrl;

      player.save().then((player) => {
        res.status(201).json({ "resouce": player });
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });


});


router.post("/link", async (req, res) => {
  const { gameData, id } = req.body;

  Player.findOne({ _id: id }).then((player) => {
    player.games.push(gameData);
    player.setup = true;
    player.markModified("games");
    console.log(player)
    player.save().then((player) => {
      res.status(201).json({ "resouce": player });
    });
  })

  // change setup === true
});

router.get("/getplayer", async (req, res) => {
  const { email } = req.body;

  // find player by id
  Player.findOne({ email: email }).then((player) => {
    res.status(201).json({
      player: player,
    });
  });

  // change setup === true
});








// }




module.exports = router;
