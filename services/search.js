
var config = require('../config'),
    request = require('request'),
    fs = require('fs'),
    path = require('path');

var accessToken,
    badWords = [];

// read in bad words
fs.readFile(path.join(process.cwd(), 'misc', 'badwords.txt'), function(err, contents) {
    if (err) console.error(err);
    var words = contents.toString().toLowerCase().split(/\n\r?/g);
    words.forEach(function(word) {
        badWords.push(word.trim());
    });
    console.log("Read " + badWords.length + " bad words");
});

exports.init = function(app) {
    app.get('/search', function(req, res) {
        console.log("Searching...");
        withToken(function() {
            searchTweets(req, function(error, resp, tweets) {
                if (error) handleError(error, req, res);
                console.log('Found ' + tweets.length + ' tweets!');
                var data = analyzeTweets(tweets);
                res.send(data);
            })
        });
    });
};

function withToken(cb) {
    var key = encodeURIComponent(config.twitter.consumerKey) + ':' + encodeURIComponent(config.twitter.consumerSecret);
    var keyEncoded = new Buffer(key).toString('base64');

    console.log("Making request: " + keyEncoded);
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
            'screen_name': req.query.twitter,
            'count': 200
        }
    }, function (error, response, body) {
        var tweets = JSON.parse(body);
        cb(error, response, tweets);
    });
}

function analyzeTweets(tweets) {
    var good = [],
        bad = [];
    
    tweets.forEach(function(tweet) {
        var entry = {
            type: 'twitter',
            content: tweet.text,
            data: tweet
        };
        
        var isBad = false;
        for (var i=0; i<badWords.length && !isBad; i++) {
            if (entry.content.toLowerCase().indexOf(badWords[i]) >= 0) {
                bad.push(entry);
                isBad = true;
            }
        }
        if (!isBad) {
            good.push(entry);
        }
    });
    
    return {
        good: good,
        bad: bad
    };
}