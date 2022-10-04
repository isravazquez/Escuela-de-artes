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
        type: DataTypes.CHAR(32),
        allowNull: false
    },
    apellido: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        validate: {
            isEmail: true,
            unique: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Maestro;