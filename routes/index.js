
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', {
        user: req.user, //use this to display user information
        env: process.env
    })
};