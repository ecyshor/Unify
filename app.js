/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var webSocket = require('./lib/setup_pusher.js');
var passport = require('passport');
var strategy = require('./lib/setup_passport.js');
// all environments
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    //app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    /**
     * Auth0 configurations
     */
    app.use(express.cookieParser());
    app.use(express.session({secret: 'shhhhhh'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

});
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
/**
 * Socket.IO server (single process only)
 */
//webSocket.configWebSocket(server);


app.get('/', routes.index);
app.get('/error', function (req, res) {
    res.send("Error");
});
app.get('/callback',
    passport.authenticate('auth0',
        {   successRedirect: '/',
            failureRedirect: '/login'
        }),
    function (req, res) {
        if (!req.user) {
            throw new Error('user null');
        }
        res.redirect("/");
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
