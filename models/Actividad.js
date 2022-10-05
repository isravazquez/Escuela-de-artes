const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

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
        type: DataTypes.TEXT(64),
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

Maestro.hasMany(Actividad, {
    foreignKey:{
        name: 'maestro_id'
    }
})
Actividad.belongsTo(Maestro, {
    foreignKey:{
        name: 'maestro_id',
    }
})

// ASOCIACIONES
Resena.belongsTo(Actividad, {
    foreignKey:{
        name: 'actividad_id'
    }
})
Actividad.hasMany(Resena, {
    foreignKey:{
        name: 'actividad_id'
    }
})

module.exports = Actividad;