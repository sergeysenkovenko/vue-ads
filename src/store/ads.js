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
    createAd ({commit}, payload) {
      payload.id = JSON.stringify(Math.floor(Math.random() * 10000) + 1)
      console.log(payload.id)
      commit('createAd', payload)
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
