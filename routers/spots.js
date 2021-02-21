const express = require("express");
const router = express.Router();
const needLogin = require("./needLogin");
const {createSpot, findSpots, updateSpot} = require("../models/spots");

router.post("/update", (req, res) => { //更新spot信息
    if(needLogin(req, res)) return;
    const data = req.body;
    updateSpot(data).then((result) => {
        res.send({code: 0, message: "写入地点信息成功", data: null});
    }).catch(() => {
        res.send({code:1, message: "写入地点信息失败", data: null});
    });
});

router.post("/create", (req, res) => { //创建一个新的spot
    if(needLogin(req, res)) return;
    const data = req.body;
    createSpot({
        itineraryId: data.itineraryId,
        spotOrder: data.spotOrder,
        description: "",
        level1: "",
        level2: "",
        level3: "",
        level4: "",
        level5: "",
        spotName: "",
        spotNameCN: "",
        spotNamePY: "",
        longitude: "",
        latitude: "",
        time: 0,
    }).then((result) => {
        res.send({code: 0, message: "创建地点成功", data: result});
    }).catch(() => {
        res.send({code:1, message: "创建地点失败", data: null,});
    });
});

router.get("/list",(req, res) => {
    if(needLogin(req, res)) return;
    findSpots({itineraryId: req.query.itineraryId}).then((result) => {
        res.send(result)
    })
})
module.exports = router;