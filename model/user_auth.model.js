const Sequelize = require('sequelize');
const db = require("../database");

const UserAuth = db.define('user_auth',{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
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
})
const init = async () =>{
    await UserAuth.sync();
}
init()

module.exports = UserAuth;
