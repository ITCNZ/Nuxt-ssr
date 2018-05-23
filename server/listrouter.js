// 引入编写好的api
const api = require('./api');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
//
//
// // 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, '../pages')))
//
// // 编辑页面
// app.get('/newsedit', (req, res) => {
//     const html = fs.readFileSync(path.resolve(__dirname, '../html/newsedit.html'), 'utf-8')
//     res.send(html)
// })
//
// // 列表页面
// app.get('/newslist', (req, res) => {
//     const html = fs.readFileSync(path.resolve(__dirname, '../html/newslist.html'), 'utf-8')
//     res.send(html)
// })
//
// // 详情面
// app.get('/newsdetail/:id', (req, res) => {
//     const html = fs.readFileSync(path.resolve(__dirname, '../pages/user/one.vue'), 'utf-8')
//     res.send(html)
// })
//
//
// // 爬虫页面
// app.get('/spider/', (req, res) => {
//     const html = fs.readFileSync(path.resolve(__dirname, '../html/spider.html'), 'utf-8')
//     res.send(html)
// })


// 监听3333端口
app.listen(3000);
