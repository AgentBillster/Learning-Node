const router = require("express").Router();
const passport = require("passport");

//auth login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/success", (req, res) => {
  res.render("success");
});

router.get("/logout", (req, res) => {
  res.send("logout");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// call that fires after auth process is complete
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000/auth/success");
});

module.exports = router;
