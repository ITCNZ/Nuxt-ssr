import Cookie from 'js-cookie'
export default function ({ route, req, res, redirect, error, store }) {

  //获取服务端cookie
  function getcookiesInServer(req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  }

  //获取客户端cookie
  function getcookiesInClient(key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  }


  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/login';
  var authUser, path

  //在服务端
  if (isServer) {
    let cookies = getcookiesInServer(req)
    path = req.originalUrl;
    authUser = cookies.authUser ? cookies.authUser : ''
  }

  //在客户端判读是否需要登陆
  if (isClient) {
    authUser = getcookiesInClient('authUser')
    path = route.path;
    console.log('authUser------', authUser)
    console.log('path------', path)
  }

  if (path) {
    redirectURL = '/login'
  }

  //需要进行权限判断的页面开头
  if (!authUser) {
    redirect(redirectURL)
  }
























}
