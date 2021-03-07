<template>
   <v-app>
        <v-app-bar app class="indigo">
          <v-toolbar-title >Choirless <span v-if="this.$store.state.session.loggedIn">{{ this.$store.state.session.profile.email }} </span></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn v-if="this.$store.state.session.loggedIn" to="/logout" nuxt>Log Out
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-btn v-if="!this.$store.state.session.loggedIn" to="/login" nuxt>Log In
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-app-bar>
        <v-main>
          <v-container fluid>
            <Nuxt />
          </v-container>
        </v-main>
        <v-footer app>
          Copyright 2021
        </v-footer>
  </v-app>
 
</template>
