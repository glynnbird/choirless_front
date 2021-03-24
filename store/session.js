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
  },
  logout(state) {
    state.profile = null
    state.credentials = null
    state.loggedIn = false
  },
  setRequiredRoute(state, route) {
    state.requiredRoute = route
  }
}
