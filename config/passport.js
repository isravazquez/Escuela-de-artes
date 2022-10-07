const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Alumno = require("../models/Alumno")
const Maestro = require("../models/Maestro")
const Administrador = require("../models/Administrador");
const { Strategy } = require('passport-local');

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async function (email, password, done) {
    try {
        const alumno = await Alumno.findOne({ where: { email: email } })
        if (!alumno || Alumno.validarPassword(password, alumno.password_salt, alumno.password_hash)) {
            return done(null, false, { error: { "email o contraseña": "equivocados" } })
        }
        return done(null, user)
    } catch (done) { }
}))

module.exports = passport;