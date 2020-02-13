const instanse = require("./index");

const Spots = instanse.sequelize.define("spots", {
    spotsId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    itineraryId: instanse.Sequelize.INTEGER,
    level1: instanse.Sequelize.CHAR,
    level2: instanse.Sequelize.CHAR,
    level3: instanse.Sequelize.CHAR,
    level4: instanse.Sequelize.CHAR,
    level5: instanse.Sequelize.CHAR,
    spotName: instanse.Sequelize.CHAR,
    spotNameCN: instanse.Sequelize.CHAR, // 该点的具体中文名称
    spotNamepy: instanse.Sequelize.CHAR, // 该点的名称的拼音
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