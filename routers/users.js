const express = require("express");
const router = express.Router();
const {queryUsers,} = require("../models/users");

router.post("/login",(req,res) => {
    queryUsers(req.body.username, req.body.password).then((results) =>{
        
        req.session.regenerate(function(err) {
            if(err){
              return res.json({ret_code: 2, ret_msg: '登录失败'});        
            }
             
            req.session.username = results[0].name;
            req.session.password = results[0].pass;
            res.send(results[0]);              
          });
    },(errors) =>{
        console.log(errors);
        res.end();
    });
});

module.exports = router;