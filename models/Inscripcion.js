const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/db')

const Alumno = require('./Alumno')
const Actividad = require('./Actividad')

//Inscripción
const Inscripcion = sequelize.define('Inscripcion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actividad_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// ASOCIACIONES
Inscripcion.belongsTo(Actividad)
Actividad.hasMany(Inscripcion)

module.exports = Inscripcion;