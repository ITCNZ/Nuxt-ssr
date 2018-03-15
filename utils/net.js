import  UI from "./ui";
import axios from 'axios'
import qs from 'qs';

var Net = {
  
  getJSON: function (url, params, config) {
    return new Promise(function(resolve, reject){

      axios.get(url, config)
        .then(function(res){
          res.status == 200 ? resolve(res) : reject('错误:', res.status);
        })
        .catch(function(err){
          UI.toast("哎呀，网络连接出错啦");
          reject(err);
        })
    });
  },
  postJSON: function (url, params, data, config) {

    var i = 0;
    var isHasPraram;

    //检测url
    if (url.indexOf("?") != -1){
      isHasPraram = true;
    }

    for (var o in params) {
      if (params[o] == undefined || params[o] == null) {
        continue;
      }
      if (i == 0 && !isHasPraram) {
        url += "?" + o + "=" + params[o];
      }
      else {
        url += "&" + o + "=" + params[o];
      }
      i++;
    }

    return new Promise(function(resolve, reject){

      axios.post(url, qs.stringify(data), config)
        .then(function(res){
          res.status == 200 ? resolve(res) : reject('错误:', res.status);
        })
        .catch(function(err){
          UI.toast("哎呀，网络连接出错啦");
          reject(err);
        })
    });
  }

}


export default Net;
