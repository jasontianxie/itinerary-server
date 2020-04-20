const instanse = require("./index");
const { createItinerary, Itineraries, } = require("./itineraries");

const Spots = instanse.sequelize.define("spots", {
    spotId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    spotOrder: instanse.Sequelize.INTEGER,
    description: instanse.Sequelize.TEXT,
    itineraryId: instanse.Sequelize.INTEGER,
    level1: instanse.Sequelize.CHAR,
    level2: instanse.Sequelize.CHAR,
    level3: instanse.Sequelize.CHAR,
    level4: instanse.Sequelize.CHAR,
    level5: instanse.Sequelize.CHAR,
    spotName: instanse.Sequelize.CHAR,
    spotNameCN: instanse.Sequelize.CHAR, // 该点的具体中文名称
    spotNamePY: instanse.Sequelize.CHAR, // 该点的名称的拼音
    longitude: instanse.Sequelize.CHAR, // 该点经度
    latitude: instanse.Sequelize.CHAR, // 该点的纬度
    time: instanse.Sequelize.INTEGER, // 什么时间到达该点
},{
    timestamps: false,
});

function createSpot(data) {
    if(!data.itineraryId) { // 如果没有游记id，说明是新增的游记，需要先创建id
        return createItinerary(0).then((result) => {
            return Spots.create({
                itineraryId: result.itineraryId,
                spotOrder: data.spotOrder || 0,
                description: data.description || "",
                level1: data.level1 || "",
                level2: data.level2 || "",
                level3: data.level3 || "",
                level4: data.level4 || "",
                level5: data.level5 || "",
                spotName: data.spotName || "",
                spotNameCN: data.spotNameCN || "",
                spotNamePY: data.spotNamePY || "",
                longitude: data.longitude || "",
                latitude: data.latitude || "",
                time: data.time || 0,
            });
        });
    }
    return Spots.create({
        itineraryId: data.itineraryId,
        spotOrder: data.spotOrder || 0,
        description: data.description || "",
        level1: data.level1 || "",
        level2: data.level2 || "",
        level3: data.level3 || "",
        level4: data.level4 || "",
        level5: data.level5 || "",
        spotName: data.spotName || "",
        spotNameCN: data.spotNameCN || "",
        spotNamePY: data.spotNamePY || "",
        longitude: data.longitude || "",
        latitude: data.latitude || "",
        time: data.time || 0,
    });
}

function findSpots(reqValue) { // reqVale为一个对象
    Itineraries.hasMany(Spots, {
        foreignKey: 'itineraryId'
      })
    Spots.belongsTo(Itineraries, {
        foreignKey: 'itineraryId'
      })
    return Spots.findAll({where:reqValue,include:[{model:Itineraries, attributes:["title"]}]});
}

module.exports = {createSpot, findSpots,};