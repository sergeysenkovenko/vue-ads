import * as firebase from 'firebase'

class Ad {
  constructor (title, description, imageSrc = '', ownerId, promo = false, id = null) {
    this.title = title
    this.description = description
    this.imageSrc = imageSrc
    this.ownerId = ownerId
    this.promo = promo
    this.id = id
    this.title = title
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(i => {
        return i.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          '',
          getters.user.id,
          payload.promo
        )
        const image = payload.image
        const ad = await firebase.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`ads/${ad.key}.${imageExt}`).put(image)
        fileData.ref.getDownloadURL().then(function (url) {
          firebase.database().ref('ads').child(ad.key).update({
            imageSrc: url
          })
          commit('setLoading', false)
          commit('createAd', {
            ...newAd,
            id: ad.key,
            imageSrc: url
          })
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const resAds = []
      try {
        const dbVal = await firebase.database().ref('ads').once('value')
        const ads = dbVal.val()
        if (ads !== null) {
          Object.keys(ads).forEach(key => {
            const ad = ads[key]
            resAds.push(
              new Ad(ad.title, ad.description, ad.imageSrc, ad.ownerId, ad.promo, key)
            )
          })
        }
        commit('loadAds', resAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    adsPromo (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
