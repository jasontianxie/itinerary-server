const express = require("express");
const router = express.Router();
const {createSpot} = require("../models/spots")

router.post("/update", (req, res) => {
    createSpot({
        
    })
})