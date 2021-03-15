export const state = () => ({
  choirList: null,
  currentChoir: null,
  currentChoirSongs: null
})

export const mutations = {
  writeChoirList(state, arr) {
    state.choirList = arr
  },
  clearChoirList(state) {
    state.choirList= []
  },
  resetChoirList(state) {
    state.choirList= null
  },
  setCurrentChoir(state, choir) {
   state.currentChoir = choir
  },
  setCurrentChoirSongs(state, songs) {
   state.currentChoirSongs = songs
  }
}
