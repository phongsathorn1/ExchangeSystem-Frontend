import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: ''
  },
  mutations: {
    setUserToken (state, token) {
      state.userToken = token
    }
  },
  actions: {

  }
})
