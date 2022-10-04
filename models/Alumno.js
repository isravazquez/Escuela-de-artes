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
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            is: /^[a-zA-Z]+$/
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
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