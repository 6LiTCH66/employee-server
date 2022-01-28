const Sequelize = require('sequelize');
const db = require("../database");

const UserAuth = db.define('user_auth',{
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login_at:{
        type: Sequelize.DATE,
        allowNull: true
    },
    logout_at:{
        type: Sequelize.DATE,
        allowNull: true
    },
    ip:{
        type: Sequelize.STRING,
        allowNull: true
    },
    agent:{
        type: Sequelize.STRING,
        allowNull: true
    },
    token:{
        type: Sequelize.STRING,
        allowNull:true
    },
    isOnline: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: "user_auth",
    underscored: true,
    timestamps: false,
})
const init = async () =>{
    await UserAuth.sync();
}
init()

module.exports = UserAuth;
