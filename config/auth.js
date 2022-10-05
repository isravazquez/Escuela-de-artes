const secret = require("./secret");
const {expressjwt} = require("express-jwt")

function getTokenFromHeader(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
}