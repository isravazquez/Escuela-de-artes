//CONEXIÓN A LA BASE DE DATOS
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {dialectOptions: {
    ssl:
    {
        require: true, rejectUnauthorized: false
    }
}});

//const sequelize = new Sequelize('sqlite://db.sqlite');

module.exports = sequelize;
