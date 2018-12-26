const instanse = require("./index");

function createNewRecord(routeID, values){
    const RouteDetail = instanse.sequelize.define("route" + routeID, {
        id: { type: instanse.Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        routeID: instanse.Sequelize.INTEGER,
        userId: instanse.Sequelize.INTEGER,
        itineraryId : instanse.Sequelize.INTEGER,
        startDate: instanse.Sequelize.CHAR,
        startTime: instanse.Sequelize.CHAR,
        endDate: instanse.Sequelize.CHAR,
        endTime: instanse.Sequelize.CHAR,
        waitTime: instanse.Sequelize.INTEGER,
        vehicle : instanse.Sequelize.CHAR,
        vehicleNote : instanse.Sequelize.CHAR,
        cost: instanse.Sequelize.INTEGER,
    },{
        timestamps: false
    });

    return RouteDetail.create({
        routeID: values.routeID,
        userId: values.userId,
        itineraryId: values.itineraryId,
        startDate: values.startDate,
        startTime: values.startTime,
        endDate: values.endDate,
        endTime: values.endTime,
        waitTime: values.waitTime,
        vehicle: values.vehicle,
        vehicleNote: values.vehicleNote,
        cost: values.cost,
    })
}

module.exports = createNewRecord;