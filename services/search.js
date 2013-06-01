
var config = require('../config'),
    request = require('request');

var accessToken;

exports.init = function(app) {
    app.get('/search', function(req, res) {
        console.log("Searching...");
        withToken(function() {
            searchTweets(req, function(tweets) {
                console.log('Tweets: ', tweets);
                res.send(tweets);
            })
        });
    });
};

function withToken(cb) {
    var key = encodeURIComponent(config.twitter.consumerKey) + ':' + encodeURIComponent(config.twitter.consumerSecret);
    var keyEncoded = new Buffer(key).toString('base64');

    request({
        url: 'https://api.twitter.com/oauth2/token',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + keyEncoded
        },
        form: {
            'grant_type': 'client_credentials'
        }
    }, function (error, response, body) {
        accessToken = JSON.parse(body).access_token;
        console.log("Twitter Access Token: ", accessToken);
        cb();
    });
}

function searchTweets(req, cb) {

    request({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        qs: {
            'screen_name': req.session.providers[0].username,
            'count': 200
        }
    }, function (error, response, body) {
        var tweets = JSON.parse(body);
        cb(tweets);
    });
}