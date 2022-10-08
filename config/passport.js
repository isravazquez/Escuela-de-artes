const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const Alumno = require("../models/Alumno")
const Maestro = require("../models/Maestro")
const Administrador = require("../models/Administrador")


passport.use(new BearerStrategy(async function (token, done) {
    try {
        const body = jwt.decode(token, { secret });
        let user
        if(body.type === 1){
            user = await Alumno.findOne({ where: { email: body.email } })
        }
        if(body.type === 2){
            user = await Maestro.findOne({ where: { email: body.email } })
        }
        if(body.type === 3){
            user = await Administrador.findOne({ where: { email: body.email } })
        }
        if (!user) return done(null, false, { errors: { 'JWT': 'invalido' } })
        return done(null, user)
    } catch (done) {}
}))

module.exports = passport;