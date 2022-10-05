const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

const crearPassword = function (pass) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(pass, salt, 10000, 512, "sha512")
        .toString("hex");
    return { password_salt: salt, password_hash: hash }
}

const validarPassword = function (password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
        .toString("hex");
    return user_hash === hash;
}

const generarJWT = function(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        user: user.email,
        exp: parseInt(exp.getTime() / 1000)
    }, secret)
}

module.exports = {
    crearPassword,
    validarPassword,
    generarJWT
}