const Sequelize = require('sequelize');
const db = require("../database");

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    tableName: "user",
    timestamps: false,
})


const init = async ()=> {
    await User.sync();
}
init()
module.exports = User;