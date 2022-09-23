const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Inscripcion = require('./Inscripcion')
const Resena = require('./Resena')
const Maestro = require('./Maestro')

//Actividad
const Actividad = sequelize.define('Actividad', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    maestro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    costo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    horario: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Maestro.hasMany(Actividad)
Actividad.belongsTo(Maestro)

// ASOCIACIONES
Resena.belongsTo(Actividad)
Actividad.hasMany(Resena)

module.exports = Actividad;