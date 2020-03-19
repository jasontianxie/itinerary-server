const express = require("express");
const router = express.Router();
const {queryUsers,} = require("../models/users");

router.post("/login",(req,res) => {
    queryUsers(req.body.username, req.body.password).then((results) =>{
        res.send(results[0]);
    },(errors) =>{
        console.log(errors);
        res.end();
    });
});

module.exports = router;