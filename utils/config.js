
/**
 * 环境检查
 * @param localEnv
 */
var checkCurrentEnv = function (localEnv, rt) {
  var SERVER = {
    url: {
      api : "/api"
    },
    env: ""
  };

  var root = "";

  if(typeof window != 'undefined'){
    root = window.location.origin;
  }
  else{
    root = rt;
  }

  var env, localEnv, port,dot;
  if (localEnv) {
    env = localEnv == "formal" ? "" : localEnv;
  }
  else {
    localEnv = "dev";
    //当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
    env = root.indexOf("localhost") != -1 ? "" : root.indexOf("dev") != -1 ? "dev" : root.indexOf("test")  != -1 ? "test" : root.indexOf("pre") != -1 ? "pre" : "";
  }

  //当前4000 走预发布
  if(env == "" && window.location.port == "4000"){
    env = "pre";
  }

  SERVER.env = env;
  //端口检查
  for (var obj in SERVER.url) {
    var envTemp = env == "" ? "" : (env + ".");
    var port = ":3333";
    //服务地址
    if (env == "") {
      SERVER.url[obj] = "http://localhost"+port+ SERVER.url[obj];
    } else {
      SERVER.url[obj] = "http://" +envTemp+ "itcnz.top"+port+ SERVER.url[obj];
    }

  }
  return SERVER;
}

//环境检测
//当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
let SERVER = checkCurrentEnv("");

//服务器地址
window.SERVER_PATH = SERVER;

console.log('当前服务器地址....',SERVER);
