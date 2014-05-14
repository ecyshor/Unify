/**
 * Created by Nicu on 11/05/14.
 * Pusher client side javascript
 */

var pusher = new Pusher('0007517e1e322f716c8a');
pusher.connection.bind('state_change', function (states) {
    alert("Pusher's current state is " + states.current);
});

var channels = [];
function subscribeToChannel(channelName) {
    var channel = pusher.subscribe(channelName);
    channel.bind('new-post', function (data) {
        alert(data);
        $('#centerPostsInsideJumbatron').prepend(data);
    });
    channels.push(channel);
}

function publish(data) {
    channels.forEach(function (entry) {
        entry.trigger('client-new-post', data);
    })
}