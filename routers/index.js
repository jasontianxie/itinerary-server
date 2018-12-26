const express = require('express');
const router = express.Router();
const queryUsers = require("../modles/users");
const createSpot = require("../modles/spots");
const {createRoute, queryRoute} = require("../modles/routes");
const createNewRecord = require("../modles/routeDetail");
const queryMainPageSlideData = require("../modles/mainPageSlideData");

router.post('/users',(req,res) => {
    queryUsers(req.body.userName, req.body.password).then((results) =>{
        res.send(results);
    },(errors) =>{
        console.log(errors);
        res.end();
    })
});

router.get('/mainPageSlideData',(req,res) => {
        res.send(queryMainPageSlideData());
});

router.post('/newRouteForm', (req, res) => {
    const reqBody = req.body;
    let promises = [];
    console.log("reqBody");
    console.log(reqBody);
    if (reqBody.startSpotId === "") {//更新数据点
        promises.push(createSpot({
            country: reqBody.country,
            level1: reqBody.startSelect[0] || null,
            level2: reqBody.startSelect[1] || null,
            level3: reqBody.startSelect[2] || null,
            level4: reqBody.startSelect[3] || null,
            level5: reqBody.startSelect[4] || null,
            fullname: reqBody.startSpot,
        }));
    }
    if (reqBody.endSpotId === "") {//更新数据点
        promises.push(createSpot({
            country: reqBody.country,
            level1: reqBody.endSelect[0] || null,
            level2: reqBody.endSelect[1] || null,
            level3: reqBody.endSelect[2] || null,
            level4: reqBody.endSelect[3] || null,
            level5: reqBody.endSelect[4] || null,
            fullname: reqBody.endSpot,
        }));
    }
    Promise.all(promises).then((results) =>{
        if(results.length === 0){// 如果两个点都存在
            return queryRoute({startSpotID: reqBody.startSpotId, endSpotID: reqBody.endSpotId}).then(
                (results) =>{
                    if(results.length){// 如果两个点都存在，但是这两个点之间已经有了route
                        return {dataValues:results[0].routeID}
                    } else{// 如果两个点都存在，但是这两个点之间还没有route
                        return createRoute({startSpotID: reqBody.startSpotId, endSpotID: reqBody.endSpotId});
                    }
                },(errors) =>{
                    console.log(errors);
                }
            )
        } else if (results.length === 1 && reqBody.startSpotId !== "") {// 如果只有起始点存在
            return createRoute({startSpotID: reqBody.startSpotId, endSpotID: results[0].id});
        } else if (results.length === 1 && reqBody.endSpotId !== "") {// 如果只有终点存在
            return createRoute({startSpotID: results[0].id, endSpotID: reqBody.endSpotId});
        } else {// 如果两个点都不存在
            return createRoute({startSpotID: reqBody.startSpotId, endSpotID: reqBody.endSpotId});
        }
    },(errors)=>{
        console.log(errors);
    }).then((results) =>{
        // console.log("this is the results");
        // console.log(results.dataValues);
        return createNewRecord(results.dataValues.routeID, {
            routeID: results.dataValues.routeID,
            userId: parseInt(reqBody.userid),
            itineraryId: parseInt(reqBody.itineraryId),
            startDate: reqBody.startTime.split(" ")[0],
            startTime: reqBody.startTime.split(" ")[1],
            endDate: reqBody.endTime.split(" ")[0],
            endTime: reqBody.endTime.split(" ")[1],
            waitTime: reqBody.waitTimeHours * 60 + reqBody.waitTimeMimutes,
            vehicle: reqBody.vehicle,
            vehicleNote: reqBody.comments,
            cost: reqBody.cost,
        })
    },(errors) =>{
        console.log(errors);
    }).then((res) =>{
        console.log(res);
    },(error) =>{
        console.log(error)
    })
    res.send('success');
});

module.exports = router;