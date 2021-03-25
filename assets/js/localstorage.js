// get localStorage instance
const myStorage = window.sessionStorage

// the key we use to save data against in localStorage
const KEY = 'choirless_session'

const localstorage = {
  loadProfile: function () {
    const str = myStorage.getItem(KEY)
    console.log('localstorage loadProfile', str)
    if (str !== null) {
      return JSON.parse(str)
    } else {
      return null
    }
  },
  saveProfile: function (profile) {
    console.log('localstorage saveProfile', profile)
    myStorage.setItem(KEY, JSON.stringify(profile))
  },
  deleteProfile: function() {
    myStorage.clear()
  }
}

export default localstorage