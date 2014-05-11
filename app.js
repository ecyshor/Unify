/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var webSocket = require('./lib/setup_websocket.js');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'sesss'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
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
webSocket.configWebSocket(server);


app.get('/', routes.index);
app.get('/callback',
    passport.authenticate('auth0'),
    function (req, res) {
        res.redirect("/");
    });


