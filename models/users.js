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
function queryEmail(email) {
    return User.findAll({
        where: {
            email
        },
    });
}

function queryUsername(username) {
    return User.findAll({
        where: {
            name: username
        },
    });
}

function createUser(email, name, pass) {
    return User.create({
        email,
        name,
        pass
    });
}

module.exports = {queryUsers, queryEmail, queryUsername, createUser,};