const instanse = require("./index");

const Spots = instanse.sequelize.define("spots", {
    spotId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    itineraryId: instanse.Sequelize.INTEGER,
    level1: instanse.Sequelize.CHAR,
    level2: instanse.Sequelize.CHAR,
    level3: instanse.Sequelize.CHAR,
    level4: instanse.Sequelize.CHAR,
    level5: instanse.Sequelize.CHAR,
    spotName: instanse.Sequelize.CHAR,
    spotNameCN: instanse.Sequelize.CHAR, // 该点的具体中文名称
    spotNamePY: instanse.Sequelize.CHAR, // 该点的名称的拼音
    time: instanse.Sequelize.INTEGER, // 什么时间到达该点
},{
    timestamps: false
});

function createSpot(data) {
    return Spots.create({
        itineraryId: data.itineraryId || 0,
        level1: data.level1 || "",
        level2: data.level2 || "",
        level3: data.level3 || "",
        level4: data.level4 || "",
        level5: data.level5 || "",
        spotName: data.spotName || "",
        spotNameCN: data.spotNameCN || "",
        spotNamePY: data.spotNamePY || "",
        time: data.time || 0,
    });
}

function findSpots(reqValue) {
    return Spots.findAll({where:reqValue});
}

module.exports = {createSpot, findSpots};