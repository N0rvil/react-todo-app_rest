const Sequelize = require("sequelize");
require('dotenv').config()

DB_NAME = process.env.DB_NAME
DB_USERNAME = process.env.DB_USERNAME
DB_PASSWORD = process.env.DB_PASSWORD

module.exports = sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            useUTC: true,
        },
        timezone: '+01:00',
    }
);