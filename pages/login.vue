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

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: "eu-west-1:ebc01157-c5e5-49af-bb9b-c25fc1a458c1",

        // REQUIRED - Amazon Cognito Region
        region: 'eu-west-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-west-1_CXg5OpRVG',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '116rvkone5rvqscicsol29n369',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        //cookieStorage: {
        // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //    domain: '.yourdomain.com',
        // OPTIONAL - Cookie path
         //   path: '/',
        // OPTIONAL - Cookie expiration in days
         //   expires: 365,
        // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
         //   sameSite: "strict" | "lax",
        // OPTIONAL - Cookie secure flag
        // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
           // secure: true
        //},

        // OPTIONAL - customized storage object
        //storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        //authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        //clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
       // oauth: {
       //     domain: 'your_cognito_domain',
       //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
       //     redirectSignIn: 'http://localhost:3000/',
       //     redirectSignOut: 'http://localhost:3000/',
       //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
       // }
    }
});

// You can get the current config object

const currentConfig = Auth.configure();


export default {
  data: function () {
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
        this.$router.push({name:'index'})

      } catch (error) {
        console.log('error signing in', error);
      }
    }
  }
}
</script>
