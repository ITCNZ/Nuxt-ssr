var express = require('express');
var router = express.Router();
var moment = require('moment');
var request = require('request');
// 引入模型
var listModel = require('./db');

// 解决跨域问题
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


// 登录、登出操作
const session = require('express-session')

// Sessions 来创建 req.session
router.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

// 发起 POST /api/login 请求完成用户登录，并添加该用户到 req.session.authUser
router.post('/api/login', function (req, res) {
  if (req.body.userName === 'demo' && req.body.passWord === 'demo') {
    req.session.authUser = { userName: 'demo' }
    return res.json({ userName: 'demo' })
  }
  res.status(401).json({ error: '账号或密码不正确!' })
})

// 发起 POST /api/logout 请求注销当前用户，并从 req.session 中移除
router.post('/api/logout', function (req, res) {
  delete req.session.authUser
  res.json({ ok: true })
})



module.exports = router;
