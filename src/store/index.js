import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import ads from './ads'
import user from './user'
import common from './common'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'vue-ads',
  storage: localStorage
})

export default new Vuex.Store({
  modules: {
    ads,
    user,
    common
  },
  plugins: [vuexPersist.plugin]
})
