import * as firebase from 'firebase'

class Ad {
  constructor (title, description, imgSrc = '', ownerId, promo = false, id = null) {
    this.title = title
    this.description = description
    this.imgSrc = imgSrc
    this.ownerId = ownerId
    this.promo = promo
    this.id = id
    this.title = title
  }
}

export default {
  state: {
    ads: [
      {
        title: 'First ad',
        description: 'This is description',
        promo: false,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '1232'
      },
      {
        title: 'Second ad',
        description: 'This is description',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '1233'
      },
      {
        title: 'Third ad',
        description: 'This is description',
        promo: true,
        imgSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        id: '1234'
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
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
          payload.imgSrc,
          getters.user.id,
          payload.promo
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key
        })
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
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
