const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')


//Alumno
const Administrador = sequelize.define('Administrador', {
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
        unique: true,
        allowNull: false
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


module.exports = Administrador;