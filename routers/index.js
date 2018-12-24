const express = require('express');
const router = express.Router();
const queryUsers = require("../modles/users");
const createSpot = require("../modles/spots");
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

app.post('/newRouteForm', (req, res) => {
    const reqBody = req.body;
    if (reqBody.startSpotId === "") {//更新数据点
        createSpot({
            country: reqBody.country,
            level1: reqBody.startSelect[0] || null,
            level1: reqBody.startSelect[1] || null,
            level1: reqBody.startSelect[2] || null,
            level1: reqBody.startSelect[3] || null,
            level1: reqBody.startSelect[4] || null,
            fullname: reqBody.fullname,
        }).then((results) => {
            console.log(results);
        },(error) => {
            console.log(error)
        })
    }
    if (reqBody.endSpotId === "") {//更新数据点
        createSpot({
            country: reqBody.country,
            level1: reqBody.endSelect[0] || null,
            level1: reqBody.endSelect[1] || null,
            level1: reqBody.endSelect[2] || null,
            level1: reqBody.endSelect[3] || null,
            level1: reqBody.endSelect[4] || null,
            fullname: reqBody.fullname,
        }).then((results) => {
            console.log(results);
        },(error) => {
            console.log(error)
        })
    }
    res.send('success');
});

module.exports = router;