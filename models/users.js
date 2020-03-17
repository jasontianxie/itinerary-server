const instanse = require("./index");

const User = instanse.sequelize.define("users", {
    id: { type: instanse.Sequelize.INTEGER, primaryKey: true, },
    name: instanse.Sequelize.CHAR,
    email: instanse.Sequelize.CHAR,
    pass: instanse.Sequelize.CHAR,
},{
    timestamps: false,
});

function queryUsers(name, pass) {
    return User.findAll({
        where: {
            name:name,
            pass:pass,
        },
    });
}

module.exports = {queryUsers,};