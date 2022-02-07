const Sequelize = require("sequelize")
require('dotenv').config()
module.exports = new Sequelize(process.env.DATABASE_URL, {
    host: "localhost",
    dialect: 'postgres',
    operatorsAliases: false,
    pool:{
        max: 5,
        min:0,
        acquire: 30000,
        ideal: 10000
    },
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})