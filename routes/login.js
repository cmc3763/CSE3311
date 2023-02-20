var express = require('express');
var router = express.Router();

// GET login page.
router.get('/', function(req, res, next) {
  // This tells express to look for login.html
  res.render('login', { title: 'ejs' });
});

module.exports = router;
