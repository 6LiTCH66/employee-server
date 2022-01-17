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
        allowNull: false
    },
    logout_at:{
        type: Sequelize.DATE,
        allowNull: true
    },
    ip:{
        type: Sequelize.STRING,
        allowNull: false
    },
    agent:{
        type: Sequelize.STRING,
        allowNull: false
    },
    token:{
        type: Sequelize.STRING,
        allowNull:false
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
