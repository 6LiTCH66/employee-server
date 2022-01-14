const Sequelize = require('sequelize');
const db = require("../database");

const Employee = db.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location:{
        type: Sequelize.STRING,
    },
    birthday:{
        type: Sequelize.DATE,
        allowNull: false
    }

}, {
    tableName: "employee",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})

const init = async () => {
    await Employee.sync();
};
init();

module.exports = Employee;