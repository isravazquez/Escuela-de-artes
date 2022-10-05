//CONEXIÓN A LA BASE DE DATOS
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        database: 'd6ngrbdemus4t',
        username: 'gvkygiydeafspu',
        password: 'cc918e8889847c1f55d84354d123b5514e487d87f2f1f21574dd6f0d2cfccd27', 
        host: 'ec2-3-209-39-2.compute-1.amazonaws.com',
        port: 5432,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": { "rejectUnauthorized": false }
        }
    }
); 

//const sequelize = new Sequelize('sqlite://db.sqlite');

module.exports = sequelize;
