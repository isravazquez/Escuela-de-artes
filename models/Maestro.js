const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const {
    crearPassword,
    validarPassword,
    generarJWT
} = require('./functions')

// Maestro
const Maestro = sequelize.define('Maestro', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    apellido: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password_salt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false

    }
}, {
    freezeTableName: true,
    timestamps: false
});

Maestro.crearPassword = crearPassword

Maestro.validarPassword = validarPassword

Maestro.generarJWT = generarJWT

module.exports = Maestro;