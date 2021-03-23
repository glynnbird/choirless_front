export const state = () => ({
  config: null
  })
  
  export const mutations = {
    insertConfig(state, obj) {
      //obj will contain whatever is exported from terraform
      state.config = obj  
      console.log("Config inserted ") 
    },
    clearConfig(state) {
      state.config = null
    }
  }
  
