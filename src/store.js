import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: null,
    user: null
  },
  getters: {
    getUserToken: (state) => {
      return state.userToken
    },
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    setUserToken (state, token) {
      state.userToken = token
      localStorage.setItem('user_token', token)
    },
    setUser (state, payload) {
      state.user = payload
    },
    removeToken (state) {
      state.userToken = null
      state.user = null
      localStorage.removeItem('user_token')
    }
  },
  actions: {
    loadUserToken ({ commit }) {
      let token = localStorage.getItem('user_token')
      commit('setUserToken', token)
    },
    async loadUser ({ commit, state }) {
      if (state.userToken != null) {
        Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`
        try {
          let response = await Vue.prototype.$axios.get('/user/me/')
          commit('setUser', response.data)
        } catch (error) {
          console.log(error)
        }
      }
    },
    logOut ({ commit }) {
      commit('removeToken')
      delete Vue.prototype.$axios.defaults.headers.common['Authorization']
    }
  }
})
