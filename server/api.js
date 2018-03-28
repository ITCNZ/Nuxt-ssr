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


module.exports = router;
