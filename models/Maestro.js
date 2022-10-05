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
        autoIncrement: true
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
        type: DataTypes.TEXT
    },
    password_hash: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Maestro.crearPassword = crearPassword

Maestro.validarPassword = validarPassword

Maestro.validarPassword = generarJWT

module.exports = Maestro;