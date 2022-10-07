const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

const crypto = require('node:crypto');

const Inscripcion = require('./Inscripcion')
const Resena = require('./Resena')

const {
    crearPassword,
    validarPassword,
    generarJWT
} = require('./functions')

//Alumno
const Alumno = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    apellido: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_salt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});


// ASOCIACIONES
Alumno.hasMany(Inscripcion, {
    foreignKey: {
        name: 'alumno_id'
    }
})
Inscripcion.belongsTo(Alumno, {
    foreignKey: {
        name: 'alumno_id'
    }
})

Alumno.hasMany(Resena, {
    foreignKey: {
        name: 'alumno_id'
    }
})
Resena.belongsTo(Alumno, {
    foreignKey: {
        name: 'alumno_id'
    }
})

Alumno.crearPassword = crearPassword

Alumno.validarPassword = validarPassword

Alumno.generarJWT = generarJWT

module.exports = Alumno;