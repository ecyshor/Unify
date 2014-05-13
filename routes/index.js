/*
 * GET home page.
 */

exports.index = function (req, res) {
    var user = req.user;
    if (req.user !== undefined)
        user = req.user._json;
    res.render('index', {
        user: user
    });
};