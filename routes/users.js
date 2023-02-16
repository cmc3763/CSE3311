var express = require('express');
var router = express.Router();

// GET users listing.
router.get('/', function(req, res, next) {
  // This is a placeholder
  // Normally it would send a user object or something
  res.send('respond with a resource');
});

module.exports = router;
