const express = require('express');
const router = express.Router();
const queryUsers = require("../models/users");
const {createSpot, findSpots} = require("../models/spots");
const {createRoute, queryRoute} = require("../models/routes");
const {createNewRecord, createNewRouteTable} = require("../models/routeDetail");
const queryMainPageSlideData = require("../models/mainPageSlideData");
const { createItinerary } = require("../models/itineraries");
const Op = require('sequelize').Op;

router.post('/users',(req,res) => {
    queryUsers(req.body.userName, req.body.password).then((results) =>{
        res.send(results);
    },(errors) =>{
        console.log(errors);
        res.end();
    })
});

router.get('/api/mainPageSlideData',(req,res) => {
        queryMainPageSlideData().then((results) =>{
            res.send(results);
        },(errors) =>{
            console.log(errors);
            res.end();
        });
});


router.post('/newRouteForm', (req, res) => {
    const reqBody = req.body;
    let promises = [];
    if (reqBody.startSpotId === "") {//更新数据点
        promises.push(createSpot({
            country: reqBody.startSelect[0] || null,
            level1: reqBody.startSelect[1] || null,
            level2: reqBody.startSelect[2] || null,
            level3: reqBody.startSelect[3] || null,
            level4: reqBody.startSelect[4] || null,
            level5: reqBody.startSelect[5] || null,
            fullname: reqBody.startSpot,
        }));
    }
    if (reqBody.endSpotId === "") {//更新数据点
        promises.push(createSpot({
            country: reqBody.startSelect[0] || null,
            level1: reqBody.endSelect[1] || null,
            level2: reqBody.endSelect[2] || null,
            level3: reqBody.endSelect[3] || null,
            level4: reqBody.endSelect[4] || null,
            level5: reqBody.endSelect[5] || null,
            fullname: reqBody.endSpot,
        }));
    }
    Promise.all(promises).then((results) =>{
        if(results.length === 0){// 如果两个点都存在
            return queryRoute({startSpotID: reqBody.startSpotId, endSpotID: reqBody.endSpotId}).then(
                (results) =>{
                    if(results.length){// 如果两个点都存在，但是这两个点之间已经有了route
                        return {dataValues:{routeID:results[0].routeID},routeAlreadyExist:true}
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
            return createRoute({startSpotID: results[0].id, endSpotID: results[1].id});
        }
    },(errors)=>{
        console.log(errors);
    }).then((results) =>{
        return results.routeAlreadyExist ? createNewRecord(results.dataValues.routeID, {//如果表已经存在，那么就添加一条记录
            routeID: results.dataValues.routeID,
            userId: parseInt(reqBody.userid),
            itineraryId: parseInt(reqBody.itineraryid),
            startDate: reqBody.startTime.split(" ")[0],
            startTime: reqBody.startTime.split(" ")[1],
            endDate: reqBody.endTime.split(" ")[0],
            endTime: reqBody.endTime.split(" ")[1],
            waitTime: parseInt(reqBody.waitTimeHours * 60 + reqBody.waitTimeMinutes),
            spentTime: reqBody.timeSpent,
            vehicle: reqBody.vehicle,
            vehicleNote: reqBody.comments,
            cost: reqBody.cost,
        }) : createNewRouteTable(results.dataValues.routeID).then(()=>{//如果表不存在，就先创建表，然后再增加一条记录
            return createNewRecord(results.dataValues.routeID, {
                routeID: results.dataValues.routeID,
                userId: parseInt(reqBody.userid),
                itineraryId: parseInt(reqBody.itineraryid),
                startDate: reqBody.startTime.split(" ")[0],
                startTime: reqBody.startTime.split(" ")[1],
                endDate: reqBody.endTime.split(" ")[0],
                endTime: reqBody.endTime.split(" ")[1],
                waitTime: parseInt(reqBody.waitTimeHours * 60 + reqBody.waitTimeMinutes),
                spentTime: reqBody.timeSpent,
                vehicle: reqBody.vehicle,
                vehicleNote: reqBody.comments,
                cost: reqBody.cost,
            });
        })
    },(errors) =>{
        console.log(errors);
    }).then((res) =>{
        console.log("api newRouteForm is sucess");
    },(error) =>{
        console.log(error)
    })
    res.send('success');
});

router.post('/spots', (req, res) => {
    let queryArr = req.body.value,
        queryObj = {};

    for (let i = 0; i < queryArr.length; i++) {
        if (i == queryArr.length - 1) {
            queryObj.fullname = {[Op.like]:"%" + queryArr[i] +"%"};
        } else {
            queryObj["level" + (i+1)] = queryArr[i];
        }

    }
    findSpots(queryObj).then((results) => {
        res.send(results);
    }, (error) => {
        console.log(error)
    });
});

router.post('/itineraries', (req, res) => {
    let reqBody = req.body,
    contentHtml = reqBody.contentHtml;

    contentHtml = reqBody.contentHtml;

    // 将文本中可能存在的除img，vedio，br之外的所有script标签替换成文本，并且img和vedio标签的src必须是指定的地址（用户上传过后，在本网站生成的地址），不能是用户随意写的
    
    contentHtml = contentHtml.replace(/<(img src="https\:\/\/ss0\.bdstatic\.com[^>]*)>/g, "@01212dfgdfgdfgdAASFSADFASDF*$1@234523453sdfgsgsdERHGHSH*");
    contentHtml = contentHtml.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //过滤所有html标签
    contentHtml = contentHtml.replace(/\&lt\;(\/?)div\&gt\;/g, "<$1div>"); // 显示div标签
    contentHtml = contentHtml.replace(/\&lt\;br(\/?)\&gt\;/gi, "<br$1>"); //显示br标签
    contentHtml = contentHtml.replace(/\@01212dfgdfgdfgdAASFSADFASDF\*/g, "<").replace(/\@234523453sdfgsgsdERHGHSH\*/g, ">"); //显示img标签，并且该img标签的地址必须以特定网址开头

    console.log(contentHtml);

    createItinerary({userId:reqBody.userId,contentHtml}).then((results) => { 
        res.send("success");
    }, (error) => {
        console.log(error)
    });
});

module.exports = router;