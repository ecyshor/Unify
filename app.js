/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var passport = require('./lib/setup_passport');
var pusher = require('./lib/setup_pusher');
var mongoModel = require('./lib/setup_mongoose');
// all environments

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger());
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

app.use(express.errorHandler({showStack: true, dumpExceptions: true}));


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


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


app.post('/create', function (req, res) {
    if (req.user) {
        if (req.body.channel === '') {
            res.end();
            return null;
        }
        var newPost = new mongoModel.postModel({
            channel: req.body.channel,
            text: req.body.data,
            user: {
                name: req.user._json.name,
                id: req.user._json.user_id
            }
        });
        console.log(newPost);
        res.render('\\inc\\allUsers\\posts', {posts: [
            newPost
        ]}, function (err, html) {
            if (err === null) {
                newPost.save(function (err) {
                    if (err) // ...
                        console.log(err);
                });
                pusher.trigger(newPost.channel, 'new-post', {data: html});
            }
        });
    }
    res.end();
    return;
});

