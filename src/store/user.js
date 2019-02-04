import * as firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function (data) {
            commit('setUser', new User(data.user.uid))
            commit('setLoading', false)
          })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function (data) {
           commit('setUser', new User(data.user.uid))
           commit('setLoading', false)
         })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    userLogout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userSession (state) {
      return state.user !== null
    }
  }
}
