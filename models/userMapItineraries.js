const instanse = require("./index");

const Itineraries = instanse.sequelize.define("users_itineraries_maps", {
    userId: { type: instanse.Sequelize.INTEGER, primaryKey: true, },
    itineraryId: instanse.Sequelize.INTEGER,
},{
    timestamps: false,
});

function findItinerariesUseUserId(reqValue) {
    return Itineraries.findAll({where:reqValue,});
}

function findUserUseItineraryId(reqValue) {
    return Itineraries.findAll({where:reqValue,});
}

module.exports = { findItinerariesUseUserId, findUserUseItineraryId, };