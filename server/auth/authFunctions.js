const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    // insert here all the login logic
}

exports.validation = (req, res, next) => {
    let headAuth = req.headers['authorization'];
    let token = headAuth && headAuth.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWTSECRET, (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
    })
}

function generateAccessToken(user){
    let option = {};
    return jwt.sign(user, process.env.JWTSECRET, option)
}