//CONEXIÓN A LA BASE DE DATOS
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    {
        database: 'da604cdd0trbqn',
        username: 'yhrrbfwgzphhll',
        password: 'dbf6ddf01cbcd368a3b7af3fd8578f36a863a71829c6f66222698eec2827f87c',
        host: 'ec2-35-170-146-54.compute-1.amazonaws.com',
        port: 5432,
        ssl: true,
        dialect: 'postgres',
        dialectOptions: {
            "ssl": { "rejectUnauthorized": false }
        }
    }
);

module.exports = sequelize;
