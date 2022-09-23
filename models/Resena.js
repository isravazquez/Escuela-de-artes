const { DataTypes} = require('sequelize');
const sequelize = require('../config/db')
const Alumno = require('./Alumno')
const Actividad = require('./Actividad')

const Resena = sequelize.define('Resena', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Resena;