const Sequelize = require('sequelize')
const db = require("../database")

const WebScraping = db.define('webScraping', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    category_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    sub_category_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question_title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    question_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    question_date: {
        type: Sequelize.DATE,
        allowNull:false
    },
    answer_title: {
        type: Sequelize.JSON,
        allowNull: false
    },
    answer_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    tableName: "webScraping",
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
})
const init = async () => {
    await WebScraping.sync()
}
init()
module.exports = WebScraping