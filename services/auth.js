/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
module.exports.auth = function (req, res, next) {
    var session = req.session;
    if (session.userid) {
        if (req.url.indexOf('/login') != -1) {
            res.redirect('/');

        } else {
            next();
        }
    }
    else 
    if (req.url.indexOf('/login') == -1) {
        res.redirect('/login');
    }
    else next();
}   