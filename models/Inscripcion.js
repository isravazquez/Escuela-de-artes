const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const Actividad = require('./Actividad')

//Inscripción
const Inscripcion = sequelize.define('Inscripcion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
        unique: true
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
Inscripcion.belongsTo(Actividad, {
    foreignKey:{
        name: 'actividad_id'
    }
})
Actividad.hasMany(Inscripcion, {
    foreignKey:{
        name: 'actividad_id'
    }
})

module.exports = Inscripcion;