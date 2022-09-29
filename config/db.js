//CONEXIÓN A LA BASE DE DATOS
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        database: 'dcqvm933h8f45r',
        username: 'kqqvpkqxzglgib',
        password: 'b04d4c316e736f559a24043453f4e325683b3db1e0bbeedca9d259b3a93789b1', 
        host: 'ec2-54-160-200-167.compute-1.amazonaws.com',
        port: 5432,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": { "rejectUnauthorized": false }
        }
    }
);

module.exports = sequelize;
