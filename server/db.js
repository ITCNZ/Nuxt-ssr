//引用mongoose模块
var mongoose = require('mongoose');
var moment = require('moment');
mongoose.Promise = global.Promise;
//连接数据库
mongoose.connect('mongodb://localhost/blogdata', {useMongoClient: true})
var db = mongoose.connection;
db.once('error',() => console.log('Mongo 连接失败!'));
db.once('open',() => console.log('mongodb 连接成功!'));

// 创建对象定义集合结构类型(其实就是表结构)
var testSchema = new mongoose.Schema({
  title:String,
  author:String,
  date: {
    type: String,
    default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  },
  content:String
});

//列表
var List = mongoose.model('List',testSchema);

module.exports = List;
