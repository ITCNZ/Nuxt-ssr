/**
 * 封装前端接口
 */

import Checkenv from "./checkenv";
import Net from "./net";


export default class  {

  /**
   * 文章列表
   */
  static newslist(pageIndex,pagesize){
    return Net.postJSON(Checkenv.url.api + "/newslist/", {}, {pageIndex: pageIndex, pagesize: pagesize});
  }

  /**
   * 删除文章
   */
  static newsDelet(Id){
    return Net.getJSON(Checkenv.url.api + "/newsdelet/" + Id);
  }

  /**
   * 创建文章
   */
  static newsEdit(data){
    return Net.postJSON(Checkenv.url.api + "/newsedit/", {}, data);
  }

  /**
   * 修改文章
   */
  static reEdit(Id, data){
    return Net.postJSON(Checkenv.url.api + "/newsedit/" + Id, {}, data);
  }

  /**
   * 获取单个文章
   */
  static newsOne(Id){
    return Net.getJSON(Checkenv.url.api + "/newsone/" + Id);
  }

  /**
   * 登录页面
   */
  static login(data){
    return Net.postJSON(Checkenv.url.api + "/login", {}, data);
  }

  /**
   * 登出页面
   */
  static logout(){
    return Net.postJSON(Checkenv.url.api + "/logout");
  }


  /**
   * 急眼1
   */
  static JiyanSlide(){
    return Net.getJSON(Checkenv.url.api + "/gt/register-slide?t=" + (new Date()).getTime());
  }

  /**
   * 急眼2
   */
    static JiyanValidate(data){
    return Net.postJSON(Checkenv.url.api + "/gt/validate-slide", {}, data);
  }



}
