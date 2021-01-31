module.exports = function needLogin(req, res) {
    var sess = req.session;
    var username = sess.username;
    if(!username) {
        res.status(401).end()
        return true;
    }
}