/**
 * Created by Nicu on 11/05/14.
 */
var mongoose = require('mongoose');

var uristring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/test';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});


var postSchema = mongoose.Schema({
    channel: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        name: {
            type: String,
            default: 'anonymous'},
        id: {
            type: String,
        }
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});


var userDetailsSchema = mongoose.Schema({
    nickname: {
        type: String,
        default: 'anonymous'
    },
    id: String,
    email: String,
    channels: [String]
});

//exports.models = {postModel: mongoose.model('postModel', postSchema), userDetailsMode: mongoose.model('userDetailsModel', userDetailsSchema)};
exports.postModel = mongoose.model('postModel', postSchema);
