var express = require("express");
var router = express.Router();
var path = require("path");

// GET users listing.
router.get("/:name", function (req, res, next) {
  console.log(req.params["name"]);

  let filePath = __dirname + "/../public/js/" + req.params["name"];
  console.log(filePath);
  filePath = path.resolve(filePath);
  console.log(filePath);
  res.sendFile(filePath, {}, (err) => {
    console.log(err);
  });
});

module.exports = router;
