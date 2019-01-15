import Vue from 'vue'
import Router from 'vue-router'
import privateRoutes from './private-routes'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/ad/:id',
      props: true,
      name: 'ad',
      component: Ad
    },
    {
      path: '/list',
      name: 'ad-list',
      component: AdList,
      beforeEnter: privateRoutes
    },
    {
      path: '/new',
      name: 'new-ad',
      component: NewAd,
      beforeEnter: privateRoutes
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Register
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: privateRoutes
    }
  ],
  mode: 'history'
})
