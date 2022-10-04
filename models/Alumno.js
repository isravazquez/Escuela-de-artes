const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

const crypto = require('node:crypto');

const Inscripcion = require('./Inscripcion')
const Resena = require('./Resena')

//Alumno
const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    apellido: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    email: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
/*     password: {
        type: DataTypes.TEXT,
        allowNull: false
    }, */
    password_salt: {
        type: DataTypes.TEXT
    },
    password_hash: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// ASOCIACIONES
Alumno.hasMany(Inscripcion, {
    foreignKey:{
        name: 'alumno_id'
    }
})
Inscripcion.belongsTo(Alumno, {
    foreignKey:{
        name: 'alumno_id'
    }
})

Alumno.hasMany(Resena, {
    foreignKey:{
        name: 'alumno_id'
    }
})
Resena.belongsTo(Alumno, {
    foreignKey:{
        name: 'alumno_id'
    }
})

Alumno.crearPassword  = function(pass) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(pass, salt, 10000, 512, "sha512")
        .toString("hex");
    return {salt: salt, hash: hash}
}

Alumno.validatePassword = function(password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
        .toString("hex");
    return user_hash === hash;
}

module.exports = Alumno;