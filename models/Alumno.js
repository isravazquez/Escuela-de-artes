const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db')

const Inscripcion = require('./Inscripcion')
const Resena = require('./Resena')

//Alumno
const Alumno = sequelize.define('Alumno', {
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
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// ASOCIACIONES
Alumno.hasMany(Inscripcion, {
    foreignKey:{
        name: 'alumno_id'
    }
})
Inscripcion.belongsTo(Alumno, {
    foreignKey:{
        name: 'alumno_id'
    }
})

Alumno.hasMany(Resena, {
    foreignKey:{
        name: 'alumno_id'
    }
})
Resena.belongsTo(Alumno, {
    foreignKey:{
        name: 'alumno_id'
    }
})

module.exports = Alumno;