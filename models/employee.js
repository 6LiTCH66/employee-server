const { Model } = require('sequelize');
const Sequelize = require("sequelize");
const sequelize = require('../database')

class employee extends Model {}

employee.init({
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
  },
  created_at:{
    type: Sequelize.DATE,
    allowNull: false
  },
  updated_at:{
    type: Sequelize.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'employee',
  tableName: "employee",
  underscored: true,
  timestamps: false,
});
return employee;
