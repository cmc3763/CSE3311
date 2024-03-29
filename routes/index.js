var express = require('express');
var router = express.Router();

// This is the main "page" router. All pages should be added as a route here

// GET home page.
router.get('/', function(req, res, next) {
    // This tells express to look for index.html
    res.render('index', { title: 'ejs' });
});

// GET login page.
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'ejs' });
});

// Logout functionality
router.get('/logout', function(req, res, next) {
    res.render('logout', { title: 'ejs' });
});

// GET forgot password page.
router.get('/forgot', function(req, res, next) {
    res.render('forgot', { title: 'ejs' });
});

// GET create account page.
router.get('/createAccount', function(req, res, next) {
    res.render('createAccount', { title: 'ejs' });
});

router.get('/setting', function(req, res, next) {
    res.render('setting', { title: 'ejs' })
});

router.get('/profile', function(req, res, next) {
    res.render('profile', { title: 'ejs' })
});


router.get('/card', function(req, res, next) {
    res.render('card', { title: 'ejs' })
});

router.get('/cart', function(req, res, next) {
    res.render('cart', { title: 'ejs' })
});

// GET view orders
router.get('/cart/view-orders', function(req, res, next) {
    res.render('view_orders', { title: 'ejs' })
});

//GET art_page page
router.get('/art_page/:artTitle', function(req, res, next) {
    console.log(req.params.artTitle);
    res.render('art_page', { title: 'ejs' });
});

//GET upload page
router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'ejs' });
});


module.exports = router;
