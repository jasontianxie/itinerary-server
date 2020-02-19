const express = require("express");
const router = express.Router();
const {createSpot} = require("../models/spots")

router.post("/update", (req, res) => {
    const data = req.body;
    createSpot({
        itineraryId: data.itineraryId || 0,
        level1: data.level1.name || data.level1 || '',
        level2: data.level2.name || data.level2 || '',
        level3: data.level3.name || data.level3 || '',
        level4: data.level4.name || data.level4 || '',
        level5: data.level5.name || data.level5 || '',
        spotName: data.spotName || '',
        spotNameCN: data.spotNameCN || '',
        spotNamePY: data.spotNamePY || '',
        longitude: data.longitude || '',
        latitude: data.latitude || '',
        time: data.time || 0
    }).then((result) => {
        res.send({code: 0, message: '写入地点信息成功'})
    }).catch((err) => {
        res.send({code:1, message: '写入地点信息失败'})
    })
})

module.exports = router;