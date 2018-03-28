import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    vvvv: '我是vuex----'
  },
  mutations: {
    increment (state) {
      state.counter++;
    },
    vvvv (state, vvvv) {
      state.vvvv = vvvv
    },
  }
})

export default store
