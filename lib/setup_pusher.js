/**
 * Created by Nicu on 11/05/14.
 */
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: process.env['PUSHER_APP_ID'],
    key: process.env['PUSHER_APP_KEY'],
    secret: process.env['PUSHER_APP_SECRET']
});

module.exports = pusher;