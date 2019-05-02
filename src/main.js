import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuex from 'vuex'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8000/'
})

if (localStorage.getItem('user_token')) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user_token')}`
} else {
  delete Vue.prototype.$axios.defaults.headers.common['Authorization']
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
