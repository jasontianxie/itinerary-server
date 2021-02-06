const express = require("express");
const router = express.Router();
const {queryUsers, queryEmail, queryUsername, createUser} = require("../models/users");
const {findCode, deleteEntry} = require("../models/emailcode");
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
        if (results && results.length) {
          req.session.regenerate(function(err) {
            if(err){
              res.send({code: 1, data: '登录失败'});        
            }
             
            req.session.username = results[0].name;
            req.session.password = results[0].pass;
            res.send({code: 0, data: results[0]});              
          });
        } else {
          res.send({code: 1, data: '登录失败'});
        }
        
    },(errors) =>{
        console.log(errors);
        res.end();
    });
});

router.post("/signup",(req,res) => {
  // needLogin(req, res);
  queryEmail(req.body.email).then((results) =>{
    if(results.length) {
      res.send({
        code: 1,
        message: '该email已经注册过'
      })
    } else {
      queryUsername(req.body.nickname).then((re) => {
        if(re.length) {
          res.send({
            code: 1,
            message: '该用户名已经被使用过，请换一个名字'
          })
        } else {
          findCode({email: req.body.email}).then((r) => {
            if (r.length) {
              if (String(r[0].codes) === req.body.captcha) {
                const intervalTime = 1000 * 60 * 60; // 过期时间, 1小时
                if (Date.now() - Number(r[0].timestamp) > intervalTime) {
                  res.send({
                    code: 1,
                    message: '验证码过期，请重新请求验证码'
                  });
                } else {
                  createUser(req.body.email, req.body.nickname, req.body.password).then(() => {
                    res.send({
                      code: 0,
                      message: '注册成功'
                    });
                  }).catch(() => {
                    res.send({
                      code: 1,
                      message: '注册失败'
                    });
                  })
                  deleteEntry({email: req.body.email}).catch(() => {})
                }
              } else {
                res.send({
                  code: 1,
                  message: '验证码错误'
                });
              }
            } else {
              res.send({
                code: 1,
                message: '验证码错误'
              });
            }
          })
        }
      }).catch(() =>{
        res.send({
          code: 1,
          message: '注册失败'
        });
    });
    }  
  }).catch(() =>{
      res.send({
        code: 1,
        message: '注册失败'
      });
  });
});

module.exports = router;