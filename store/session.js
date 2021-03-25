import localstorage from "~/assets/js/localstorage"

export const state = () => ({
  loggedIn: false,
  profile: null,
  credentials: null,
  requiredRoute: null
})

export const mutations = {
  login(state, obj) {
    state.profile = obj.profile
    state.credentials = obj.credentials
    state.loggedIn = true
    localstorage.saveProfile(state)
  },
  logout(state) {
    state.profile = null
    state.credentials = null
    state.loggedIn = false
    localstorage.clearProfile()
  },
  setRequiredRoute(state, route) {
    state.requiredRoute = route
  }
}
