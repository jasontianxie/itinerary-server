const express = require("express");
const router = express.Router();
const {createSpot,} = require("../models/spots");

router.post("/update", (req, res) => {
    const data = req.body;
    if (data.spotId) { // 如果有spotId,则说明是在编辑已经存在的地点
        console.log(data.spotId);
    } else { // 如果没有spotId,则说明是在创建新的地点
        createSpot({
            itineraryId: data.itineraryId,
            description: data.spotDescription || "",
            level1: data.level1 ? ((data.level1 &&typeof(data.level1) === "string") ? data.level1 : data.level1.name) : "",
            level2: data.level2 ? ((data.level2 &&typeof(data.level2) === "string") ? data.level2 : data.level2.name) : "",
            level3: data.level3 ? ((data.level3 &&typeof(data.level3) === "string") ? data.level3 : data.level3.name) : "",
            level4: data.level4 ? ((data.level4 &&typeof(data.level4) === "string") ? data.level4 : data.level4.name) : "",
            level5: data.level5 ? ((data.level5 &&typeof(data.level5) === "string") ? data.level5 : data.level5.name) : "",
            spotName: data.spotName || "",
            spotNameCN: data.spotNameCN || "",
            spotNamePY: data.spotNamePY || "",
            longitude: data.longitude || "",
            latitude: data.latitude || "",
            time: data.time || 0,
        }).then((result) => {
            res.send({code: 0, spotId: result.spotId, itineraryId: result.itineraryId, message: "写入地点信息成功",});
        }).catch(() => {
            res.send({code:1, message: "写入地点信息失败",});
        });
    }
});

module.exports = router;