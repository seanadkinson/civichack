
var conf = require('./config'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;


// Session Serialization
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

var handleProvider = function(req, provider, profile, done) {
    var p = {
        id: profile.id,
        username: profile.username
    };
    var providers = (req.session.providers = req.session.providers || {});
    providers[provider] = p;
    done(null, p);
};

exports.init = function(app) {
    
    // AUTH: Twitter
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/remove', function(req, res) {
        delete (req.session.providers || {})['twitter'];
        res.redirect('/');
    });
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    );
    passport.use(new TwitterStrategy({
            consumerKey: conf.twitter.consumerKey,
            consumerSecret: conf.twitter.consumerSecret,
            callbackURL: conf.twitter.callbackUrl,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            handleProvider(req, 'twitter', profile, done);
        }
    ));
};


// Setup "user" var in locals for views
exports.authLocals = function(req, res, next) {
    res.locals.providers = req.session.providers;
    next();
};