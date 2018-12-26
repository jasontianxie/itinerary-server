const instanse = require("./index");

const Routes = instanse.sequelize.define("routes", {
    routeID: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    startSpotID: instanse.Sequelize.INTEGER,
    endSpotID: instanse.Sequelize.INTEGER,
},{
    timestamps: false
});

function createRoute(value) {
    return Routes.create({
        startSpotID: value.startSpotID,
        endSpotID: value.endSpotID,
    });
}

function queryRoute(value) {
    return Routes.findAll({
        where: {
            startSpotID: value.startSpotID,
            endSpotID: value.endSpotID,
        }
    })
}

module.exports = {createRoute,queryRoute};
