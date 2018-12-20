const express = require('express');
const router = express.Router();
const queryUsers = require("../modles/users");

router.post('/users',(req,res) => {
    queryUsers(req.body.userName, req.body.password).then((results) =>{
        res.send(results);
    },(errors) =>{
        console.log(errors);
        res.end();
    })
})

module.exports = router;