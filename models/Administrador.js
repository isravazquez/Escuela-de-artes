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
        type: DataTypes.CHAR(32),
        allowNull: false
    },
    apellido: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(64),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});


module.exports = Administrador;