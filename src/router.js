import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register'
import Product from './views/Product.vue'
import AddProduct from './views/AddProduct.vue'
import Profile from './views/Profile.vue'
import OfferDeal from './views/OfferDeal.vue'
import DealManager from './views/DealManager.vue'
import ChangeProfilePicture from './views/ChangeProfilePicture.vue'
import Feedback from './views/Feedback.vue'
import Chat from './views/Chat.vue'
import Feedbacklist from './views/FeedbackList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/product/add',
      name: 'add_product',
      component: AddProduct
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/profile/:id',
      name: 'profile-user',
      component: Profile
    },
    {
      path: '/create-offer/:id',
      name: 'create-offer',
      component: OfferDeal
    },
    {
      path: '/deal-manager',
      name: 'deal-manager',
      component: DealManager
    },
    {
      path: '/profile/change-picture',
      name: 'profile-change-picture',
      component: ChangeProfilePicture
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: Chat
    },
    {
      path: '/feedback/list',
      name: 'feedback-list',
      component: Feedbacklist
    }
  ]
})
