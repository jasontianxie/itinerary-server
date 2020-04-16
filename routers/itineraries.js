const express = require("express");
const router = express.Router();
// const {findItineraries,} = require("../models/itineraries");
const {findItineraries,} = require("../models/itineraries");

router.get("/list",(req,res) => {
    findItineraries({userId: req.query.userid,}).then((results) =>{
        res.send(results);
    }).catch(() => {
        res.end();
    });
});

module.exports = router;