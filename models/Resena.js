const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')

//Reseña
const Resena = sequelize.define('Resena', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
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
        allowNull: false,
        validate: {
            is: /^[0-5]$/
        }
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