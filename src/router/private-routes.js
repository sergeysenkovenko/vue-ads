import store from '../store'

export default function (to, form, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
