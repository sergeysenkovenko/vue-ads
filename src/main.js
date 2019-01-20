import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBEY9xaBbuvrirCwMp-E_XDkgEFRjCTkKE',
      authDomain: 'vue-ads-c2297.firebaseapp.com',
      databaseURL: 'https://vue-ads-c2297.firebaseio.com',
      projectId: 'vue-ads-c2297',
      storageBucket: 'vue-ads-c2297.appspot.com',
      messagingSenderId: '550012449916'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
