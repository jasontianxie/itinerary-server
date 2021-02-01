const instanse = require("./index");

const MailCode = instanse.sequelize.define("email_codes", {
    id: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true,},
    email: instanse.Sequelize.CHAR,
    codes: instanse.Sequelize.INTEGER,
    timestamp: instanse.Sequelize.INTEGER,
},{
    timestamps: false,
});

function findCode(reqValue) {
    return MailCode.findAll({where:reqValue,});
}

function deleteEntry(reqValue) {
    return MailCode.destroy({where:reqValue,});
}

module.exports = { findCode, deleteEntry,};