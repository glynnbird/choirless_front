<template>
 <div>
  <h1 v-if="this.$store.state.session.loggedIn">Hello {{ this.$store.state.session.profile.email }} </h1>
  {{ session }}
  {{ this.$store.state.session }}

  <NuxtLink to="/login">Log IN</NuxtLink>
  <NuxtLink to="/logout">Log OUT</NuxtLink>

  </div>
</template>

<script>
//import AWS from 'aws-sdk';

export default {
  data: function () {
    return {}

  },
  computed: {
    session () {
      return this.$store.state.session
    }
  },
  methods: {
  }
}
</script>
