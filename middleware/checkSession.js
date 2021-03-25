import localstorage from "~/assets/js/localstorage"

export default function ({ store, redirect, route }) {
    //console.log("requested path", route.path);
    //console.log("loggedIn", store.state.session.loggedIn);

    // make sure that if localstorage says we're logged in that
    // the stored data makes it to the profile
    const profile = localstorage.loadProfile()
    if (profile !== null) {
      store.commit('session/login', profile)
    }

    // If the user is not logged in then redirect to the homepage
    if (route.path!='/login' && route.path!='/' && 
        route.path!='/logout' && !store.state.session.loggedIn) {
     console.log("not logged in - redirecting to home");
     console.log('storing required route', route.path)
     store.commit('session/setRequiredRoute', route.path)
     return redirect('/')
    }
  }
