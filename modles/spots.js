const instanse = require("./index");

const Spots = instanse.sequelize.define("spots", {
    id: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    country: instanse.Sequelize.CHAR,
    level1: instanse.Sequelize.CHAR,
    level2: instanse.Sequelize.CHAR,
    level3: instanse.Sequelize.CHAR,
    level4: instanse.Sequelize.CHAR,
    level5: instanse.Sequelize.CHAR,
    fullname: instanse.Sequelize.CHAR,
},{
    timestamps: false
});

function createSpot(reqValue) {
    return Spots.create({
        country: reqValue.country,
        level1: reqValue.level1,
        level2: reqValue.level2,
        level3: reqValue.level3,
        level4: reqValue.level4,
        level5: reqValue.level5,
        fullname: reqValue.fullname,
    });
}

function findSpots(reqValue) {
    return Spots.findAll({where:reqValue});
}

module.exports = {createSpot, findSpots};