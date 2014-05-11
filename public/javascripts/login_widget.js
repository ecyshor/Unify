/**
 * Created by Nicu on 11/05/14.
 */
var widget = new Auth0Widget({
    domain: '<%= env["AUTH0_DOMAIN"] %>',
    clientID: '<%= env["AUTH0_CLIENT_ID"] %>',
    callbackURL: '<%= env["AUTH0_CALLBACK_URL"] %>'
});