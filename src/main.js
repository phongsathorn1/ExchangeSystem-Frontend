import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vuex from 'vuex'
import axios from 'axios'
import vueMoment from 'vue-moment'
import moment from 'moment'

import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(vueMoment, { moment })

Vue.prototype.$moment.locale('th')
Vue.prototype.$axios = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT
})

const token = localStorage.getItem('user_token')

if (token === null) {
  console.log(token)
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
} else {
  delete Vue.prototype.$axios.defaults.headers.common['Authorization']
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
