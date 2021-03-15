<template>
 <div>

  <NuxtLink to="/about">About</NuxtLink>
  
  </div>
</template>

<script>

export default {
  mounted: function () {
    console.log("Logging out")
    this.$store.commit('session/logout')
    this.$store.commit('cache/resetChoirList')
    this.$router.push({name: 'index'})
  }
}
</script>
