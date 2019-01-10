const instanse = require("./index");

const Itineraries = instanse.sequelize.define("itineraries", {
    id: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    userId: instanse.Sequelize.INTEGER,
    contentHtml: instanse.Sequelize.TEXT,
},{
    timestamps: false
});

function createItinerary(value) {
    return Itineraries.create({
        userId: value.userId,
        contentHtml: value.contentHtml,
    });
}

module.exports = { createItinerary };