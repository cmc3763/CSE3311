var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  // This tells express to look for index.html
  res.render('index', { title: 'ejs' });
});

module.exports = router;
