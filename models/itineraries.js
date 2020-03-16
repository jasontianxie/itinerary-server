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

module.exports = { createItinerary, };