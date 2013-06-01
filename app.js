/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes');


// Never die!
process.addListener("uncaughtException", function (err) {
    console.log("Uncaught exception: " + err);
    console.trace();
});


// Application setup
var app = express();
app.engine('hjs', require('hogan-express'));
app.enable('view cache');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('bsd'));
app.use(express.session());
app.use(express.compress());
app.use(function(req, res, next) {
    res.locals.appVersion = process.env['APP_VERSION'] || 4;
    next();
});
app.use(app.router);
app.use(express.staticCache());

// static files and caching
var oneDay = 86400000;
var oneMonth = 30 * oneDay;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneMonth }));
app.use(express.static(path.join(__dirname, 'views'), { maxAge: oneMonth }));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
app.use(handleError);

// Views
app.locals.partials = {
    layout: 'template/layout',
    header: 'template/header',
    footer: 'template/footer'
};
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


function handleError(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
}
GLOBAL.handleError = handleError;