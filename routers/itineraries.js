const express = require("express");
const router = express.Router();
// const {findItineraries,} = require("../models/itineraries");
const {findItineraries, createItinerary,} = require("../models/itineraries");
const needLogin = require("./needLogin");

router.get("/list",(req,res) => { //根据user id查找所有的游记
    if(needLogin(req, res)) return;
    findItineraries({userId: req.query.userid,}).then((results) =>{
        res.send(results);
    }).catch(() => {
        res.end();
    });
});

router.get("/create",(req,res) => {
    if(needLogin(req, res)) return;
    createItinerary({userId: req.query.userid,}).then((results) =>{
        res.send({code: 0, message: '创建成功', data: results});
    }).catch(() => {
        res.send({code: 1, message: '创建失败', data: ''});
    });
});

module.exports = router;