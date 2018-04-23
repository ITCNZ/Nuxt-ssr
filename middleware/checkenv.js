
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

  var env, localEnv, port;
  if (localEnv) {
    env = localEnv == "formal" ? "" : localEnv;
  } else {
    localEnv = "dev";
    //当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
    env = "localhost"
    // env = root.indexOf("localhost") != -1 ? "localhost" : root.indexOf("dev") != -1 ? "dev" : root.indexOf("test")  != -1 ? "test" : root.indexOf("pre") != -1 ? "pre" : "";
  }

  SERVER.env = env;
  //端口检查
  for (var obj in SERVER.url) {
    var envTemp = env == "" ? "" : env == "localhost" ? "localhost" : (env + ".");
    // port = envTemp != '' ? '' : ":3333";
    port = ":3333";
    //服务地址
    if(envTemp == "localhost") {
      SERVER.url[obj] = "http://localhost"+port+ SERVER.url[obj];
     // SERVER.url[obj] = "http://39.107.246.220:3333"+ SERVER.url[obj];
    } else {
      SERVER.url[obj] = "http://" +envTemp+ "itcnz.top"+port+ SERVER.url[obj];
    }
  }
  return SERVER;
}


//当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
let SERVER = checkCurrentEnv("");

console.log('当前服务器地址....',SERVER);


export default SERVER;
