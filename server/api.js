var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
// 引入模型
var listModel = require('./db');

// 极验api
var session = require('express-session');
router.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
}));

var Geetest = require('gt3-sdk');
var slide = require('./slide');

// CORS解决跨域问题
router.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 读取全部文章
router.get('/api/newslist', (req, res, next) => {
    listModel.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }

    });
});

// 读取单个文章详情
router.get('/api/newsone/:id', (req, res, next) => {
  listModel.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// 写入文章
router.post('/api/newsedit', (req, res, next) => {

    let editList = new listModel({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        content: req.body.content
    });

    editList.save((err, data) => {

        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });

});

// 删除文章
router.get('/api/newsdelet/:id',(req, res, next) => {

    listModel.findById(req.params.id, (err, data) => {
        data.remove((err, data) => {
            res.send({
                msg: '你很叼哦,请求成功了!'
            });
            res.end();
        });
    });

});

// 编辑文章
router.post("/api/newsedit/:id", (req, res, next) => {
    listModel.findById(req.params.id, (err, data) => {
        data.content = req.body.content;
        data.date = req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.author = req.body.author;
        data.title = req.body.title;

        data.save(function(err, data) {
             if (err) {
                 res.send(err);
             } else {
                 res.send(data);
             }
        });

    });
});


// 登录操作
router.post('/api/login', function (req, res) {
  if (req.body.userName !== '' && req.body.passWord === '123456') {
    return res.json({ userName: req.body.userName })
  }
  res.status(401).json({ error: '账号或密码不正确!' })
})


// 极验接口
router.get("/api/gt/register-slide", function (req, res) {

  // 向极验申请每次验证所需的challenge
  slide.register(null, function (err, data) {

    if (err) {
      res.status(500);
      res.send(err);
      return;
    }

    if (!data.success) {
      // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
      // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

      // 为以防万一，你可以选择以下两种方式之一：

      // 1. 继续使用极验提供的failback备用方案
      req.session.fallback = true;
      res.send(data);

      // 2. 使用自己提供的备用方案
      // todo

    } else {
      // 正常模式
      req.session.fallback = false;
      res.send(data);
    }
  });
});

router.post("/api/gt/validate-slide", function (req, res) {

  // 对ajax提供的验证凭证进行二次验证
  slide.validate(req.session.fallback, {
    geetest_challenge: req.body.geetest_challenge,
    geetest_validate: req.body.geetest_validate,
    geetest_seccode: req.body.geetest_seccode
  }, function (err, success) {

    if (err) {
      // 网络错误
      res.send({
        status: "error",
        info: err
      });

    } else if (!success) {

      // 二次验证失败
      res.send({
        status: "fail",
        info: '登录失败'
      });
    } else {

      res.send({
        status: "success",
        info: '登录成功'
      });
    }
  });
});


module.exports = router;
