const router = require("express").Router();
const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const Player = require("../models/PlayerModel");
const Game = require("../models/GamesModel");

const googleClient = new OAuth2Client({
  clientId:
    "15426169653-rhbrmn7aosco5fn7julv7019ilu67m9e.apps.googleusercontent.com",
});

//auth login
router.post("/login", async (req, res) => {
  const { provider, token } = req.body;
  if (provider === "google") {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience:
        "15426169653-rhbrmn7aosco5fn7julv7019ilu67m9e.apps.googleusercontent.com",
    });
    const userData = ticket.getPayload();
    if (userData) {
      // good token
      Player.findOne({ email: userData.email }).then((currentUser) => {
        // check our database to see if user exists
        if (currentUser) {
          res.status(200).json(currentUser);
        } else {
          // if user does not exist then create user with payload information and return user
          const player = new Player({
            email: userData.email,
            picture: userData.picture,
            role: "player",
            setup: false,
          });

          player.save().then((user) => {
            res.status(201).json(user);
          });
        }
      });
    } else {
      res.status(500).json({
        error: "token is not valid",
      });
    }
  }
});

router.get("/get", (req, res) => {
  Game.find().then((game) => {
    if (game) {
      res.status(201).json(game);
    } else {
      res.status(500).json({
        error: "could not find that shti",
      });
    }
  });
});

module.exports = router;

// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(CLIENT_ID);
// async function verify() {
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience:
//       "163697216572-qd3mc3eij1mmm8bqrse0cl8hdg5g6krd.apps.googleusercontent.com",
//   });
//   const payload = ticket.getPayload();
//   const userid = payload["sub"];
//   // If request specified a G Suite domain:
//   // const domain = payload['hd'];
// }
// verify().catch(console.error);
