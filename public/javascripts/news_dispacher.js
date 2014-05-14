/**
 * Created by Nicu on 11/05/14.
 * Pusher client side javascript
 */

var pusher = new Pusher(process.env['PUSHER_APP_KEY']);
pusher.connection.bind('state_change', function (states) {
    alert("Pusher's current state is " + states.current);
});

var channels = [];
function subscribeToChannel(channelName) {
    var channel = pusher.subscribe(channelName);
    channel.bind('new-post', function (data) {
        $('#centerPostsInsideJumbatron').prepend(data);
    });
    channels.push(channel);
}

function publish(data) {
    channels.forEach(function (entry) {
        entry.trigger('client-new-post', data);
    })
}