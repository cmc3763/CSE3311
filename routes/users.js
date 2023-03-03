var express = require('express');
var router = express.Router();

// This is a resource router. It doesn't serve pages, instead serving "resources".
// For example, if you go to /users/4 it should return the user with ID 4 as an
// object. This route doesn't exist yet though, right now it's just a placeholder.

// GET users listing.
router.get('/', function(req, res, next) {
  // This is a placeholder
  // Normally it would send a user object or something
  res.send('respond with a resource');
});

module.exports = router;
