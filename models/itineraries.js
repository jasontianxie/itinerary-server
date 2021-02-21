const instanse = require("./index");

const Itineraries = instanse.sequelize.define("itineraries", {
    itineraryId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    draft: instanse.Sequelize.INTEGER,
    title: instanse.Sequelize.CHAR,
    userId: instanse.Sequelize.INTEGER,
},{
    timestamps: false,
});

function createItinerary(data) {
    return Itineraries.create({
        draft: 0,
        title: '',
        userId: data.userId
    });
}

function findItineraries(reqValue) { // reqVale为一个对象
    return Itineraries.findAll({where:reqValue,});
}

module.exports = { Itineraries, createItinerary, findItineraries, };