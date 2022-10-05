const crypto = require('node:crypto');

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

module.exports = {
    crearPassword,
    validarPassword
}