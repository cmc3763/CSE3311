var express = require("express");
var router = express.Router();
const firebaseManager = require("../modules/firebase.js");

// GET users listing.
router.get("/", function (req, res, next) {
  // This is a placeholder
  // Normally it would send a user object or something
  res.send("respond with a resource");
});

router.put("/register", (req, res, next) => {
  console.log(req["body"]);
  // firebaseManager.newUser(req.body["email"], req.body["password"]);
});

module.exports = router;
