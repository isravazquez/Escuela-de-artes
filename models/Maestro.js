const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

// Maestro
const Maestro = sequelize.define('Maestro', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
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

module.exports = Maestro;