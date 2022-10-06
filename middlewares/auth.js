const secret = require("../config/secret");
const { expressjwt } = require("express-jwt")

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    required: function(req, res, next){
        if(!req.auth || !this.required.auth.user) return res.sendStatus(401)
        next()
    },
    optional: expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth;