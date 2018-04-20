import Cookie from 'js-cookie'
export default function ({ route, req, res, redirect, error, store}) {

  let authUser = Cookie.get('authUser') ? Cookie.get('authUser') : ''

  if (authUser) {
    console.log('state',store)
    store.commit('SET_USER', true)
  }




}
