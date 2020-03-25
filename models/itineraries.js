const instanse = require("./index");

const Itineraries = instanse.sequelize.define("itineraries", {
    itineraryId: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true, },
    draft: instanse.Sequelize.INTEGER,
},{
    timestamps: false,
});

function createItinerary(value) {
    return Itineraries.create({
        draft: value,
    });
}

function findItineraries(reqValue) { // reqVale为一个对象
    return Itineraries.findAll({where:reqValue,});
}

module.exports = { createItinerary, findItineraries, };