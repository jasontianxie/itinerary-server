const express = require("express");
const router = express.Router();
// const {findItineraries,} = require("../models/itineraries");
const {findItineraries,} = require("../models/itineraries");
const needLogin = require("./needLogin");

router.get("/list",(req,res) => { //根据user id查找所有的游记
    if(needLogin(req, res)) return;
    findItineraries({userId: req.query.userid,}).then((results) =>{
        res.send(results);
    }).catch(() => {
        res.end();
    });
});

module.exports = router;