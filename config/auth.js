const secret = require("./secret");
const { expressjwt } = require("express-jwt")

//Funnción que busca la autenticación bearer desde los headers
function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {

    optional: expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    }),
    required: function (req, res, next) {
        //Autenticación a través de la fecha de expiración del token 
        const today = new Date()
        if (req.auth.exp < (parseInt(today.getTime() / 1000))) return res.sendStatus(401)
        if(!res.locals.auth) return res.sendStatus(401)
        return next()
    },
    admin: function (req, res, next){
        if(res.locals.auth === true) return next()
        const userType = req.auth.type;
        if(userType !== 3) return next()
        res.locals.auth = true
        return next()
    },
    maestro: function (req, res, next){
        if(res.locals.auth === true) return next()
        const userType = req.auth.type;
        if(userType !== 2) return next()
        res.locals.auth = true
        return next()
    },
    maestroId: function (req, res, next){
        if(res.locals.auth === true) return next()
        const userType = req.auth.type;
        const id = req.auth.id;
        if(userType !== 2 || id !== parseInt(req.params.id) ) return next()
        res.locals.auth = true
        return next()
    },
    alumno: function (req, res, next){
        if(res.locals.auth === true) return next()
        const userType = req.auth.type;
        if(userType !== 1) return next()
        res.locals.auth = true
        return next()
    },
    alumnoId: function (req, res, next){
        if(res.locals.auth === true) return next()
        const userType = req.auth.type;
        const id = req.auth.id;
        if(userType !== 1 || id !== parseInt(req.params.id) ) return next()
        res.locals.auth = true
        return next()
    }

}

module.exports = auth;