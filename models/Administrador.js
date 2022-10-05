const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

const {
    validarPassword,
    generarJWT
} = require('./functions')

//Alumno
const Administrador = sequelize.define('Administrador', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false
    },
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


Administrador.validarPassword = validarPassword

Administrador.validarPassword = generarJWT

module.exports = Administrador;