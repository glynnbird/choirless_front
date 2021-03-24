<template>
  
  <v-form
    ref="form"
  >
    <v-text-field
      v-model="username"
      label="email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="password"
      type="password"
      required
    ></v-text-field>

    <v-btn
      :disabled="!username || !password"
      color="success"
      class="mr-4"
      @click="login"
    >
      Log in
    </v-btn>

  </v-form>

</template>

<script>
import Amplify, { Auth } from 'aws-amplify';
import AWS from 'aws-sdk'

export default {
  async asyncData ({env}) {

    console.log(env, env.COGNITO_APP_ID)
    Amplify.configure({
        Auth: {

            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            identityPoolId: env.COGNITO_IDENTITY_POOL,

            // REQUIRED - Amazon Cognito Region
            region: env.REGION,

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: env.COGNITO_USER_POOL,

             // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: env.COGNITO_APP_ID,

            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: true

        }
    });
    // You can get the current config object
    const currentConfig = Auth.configure();

    return { 
      username: "",
      password: ""
    }

  },
  methods: {
    login: async function() {
      console.log('Login!')
      console.log(this.username, this.password)
      try {
        const user = await Auth.signIn(this.username, this.password);
        console.log(user)
        const credentials = await Auth.currentCredentials()
        console.log(credentials)
        
        this.$store.commit('session/login', { profile: user.signInUserSession.idToken.payload, credentials: Auth.essentialCredentials(credentials)})
        // fetch choirs for this user
        //first, update the credentials for the user
        AWS.config.update(Auth.essentialCredentials(credentials))
        const lambda = new AWS.Lambda({"region":"eu-west-1"})
        var payload = {"userId":42}
        var params = {
          FunctionName : "getUserChoirs-stage",
          Payload : JSON.stringify(payload),
          InvocationType : "RequestResponse"         
        }
        const response = await lambda.invoke(params).promise()
        console.log(response)
        
        if (this.$store.state.session.requiredRoute) {
          const route = this.$store.state.session.requiredRoute
          console.log('bouncing user to saved route', route)
          this.$store.commit('session/setRequiredRoute', null)
          this.$router.push(route)
        } else {
          this.$router.push({name:'choirselect'})
        }
      } catch (error) {
        console.log('error signing in', error);
      }
    }
  }
}
</script>
