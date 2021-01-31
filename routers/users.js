const express = require("express");
const router = express.Router();
const {queryUsers,} = require("../models/users");
const needLogin = require("./needLogin");

router.get("/session",(req,res) => {
  if(needLogin(req, res)) return;
  console.log('session,session,session');
  queryUsers(req.session.username, req.session.password).then((results) =>{
    res.send(results[0]);
  },(errors) =>{
      console.log(errors);
      res.end();
  });
});

router.get("/logout",(req,res) => {
  req.session.destroy(function(err) {
    if(err){
      res.json({ret_code: 2, ret_msg: '退出登录失败'});
      return;
    }
     
    // req.session.loginUser = null;
    res.clearCookie('sessionId', {path: '/', httpOnly: true, secure: false, maxAge: 1800000}).status(200).end();
  });
});

router.post("/login",(req,res) => {
    // needLogin(req, res);
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

router.post("/signup",(req,res) => {
  // needLogin(req, res);
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