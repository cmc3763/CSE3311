var express = require('express');
var router = express.Router();

// This is the main "page" router. All pages should be added as a route here

// GET home page.
router.get('/', function(req, res, next) {
  // This tells express to look for index.html
  res.render('index', { title: 'ejs' });
});

// GET login page.
router.get('/login', function (req, res, next) {
  // This tells express to look for login.html
  res.render('login', { title: 'ejs' });
});

module.exports = router;
