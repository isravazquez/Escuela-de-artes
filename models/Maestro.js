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
        validate: {
            isEmail: true,
            unique: true
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

module.exports = Maestro;