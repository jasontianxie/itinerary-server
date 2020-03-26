const express = require("express");
const router = express.Router();
// const {findItineraries,} = require("../models/itineraries");
const {findItinerariesUseUserId,} = require("../models/userMapItineraries");

router.get("/list",(req,res) => {
    findItinerariesUseUserId({userId: req.query.userid,}).then((results) =>{
        res.send(results);
    }).catch(() => {
        res.end();
    });
});

module.exports = router;