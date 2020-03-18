const express = require("express");
const router = express.Router();
const {queryUsers,} = require("../models/users");

router.post("/login",(req,res) => {
    queryUsers(req.body.name, req.body.password).then((results) =>{
        res.send(results);
    },(errors) =>{
        console.log(errors);
        res.end();
    });
});

module.exports = router;