import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    SET_MARKERS (state, vvvv) {
      state.vvvv = vvvv
    },
  },
  actions: {
    init ({ commit }) {
      // let { data } = await axios.get('http://localhost:3333/api/newslist')
      axios.get('http://localhost:3333/api/newslist')
        .then((res) => {
          commit('SET_MARKERS', res.data)
        }).catch (err => {
          console.log('报错了啊')
        })

    }









  }

})

export default store




// export const state = () => ({
//   markers: null
// })
//
// export const mutations = {
//   SET_MARKERS (state, markers) {
//     state.markers = markers
//   }
// }
//
// export const actions = {
//   async init ({ commit }) {
//     let { data } = await axios.get(api)
//     commit('SET_MARKERS', data)
//   }
// }
