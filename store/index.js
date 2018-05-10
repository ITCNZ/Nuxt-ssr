// import Api from '~/utils/api'
import Cookie from 'js-cookie'

export const state = () => ({
  // isLogin: true
})

export const mutations = {
  // SET_USER: function (state, flag) {
  //   state.isLogin = flag
  // }
}

export const actions = {

  // isLoginFn(state) {
  //   state.isLogin = true
  // },

  // async login({ commit }, opts) {
  //   try {
  //     const { data } = await Api.login(opts)
  //     Cookie.set('authUser', data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       throw new Error('Bad credentials')
  //     }
  //     throw error
  //   }
  // },

  async logout({ commit }) {
    Cookie.remove('authUser')
  }

}
