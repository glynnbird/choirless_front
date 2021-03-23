export default function ({ env, store }) {
  //if the store config object is empty, then load it with the config from env
  // If the user is not logged in then redirect to the homepage
  //console.log("current config is ", store.state.config.config)
  if (store.state.config.config == null ) {
    console.log("Loading config into store");
    store.commit("config/insertConfig", env);
  }
}
