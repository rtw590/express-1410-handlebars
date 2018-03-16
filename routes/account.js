var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

router.use(express.static('public'))

router.get('/signup', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup',
    failureFlash: true
}));

router.get('/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;
