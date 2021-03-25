<template>
  <v-breadcrumbs :items="items" divider=">" large></v-breadcrumbs>
</template>
<script>
export default {
  computed: {
    items: function() {
      // if we're not logged in, there's only one thing in the breadcrumb
      if (!this.$store.state.session.loggedIn) {
         return [ { text: 'Choirless', link: false }]
      } else {
        // otherwise build up a breadcrumb for / home / choir / song etc
        const arr = [ { href: '/choirselect', text: 'Choirless'} ]
      
        // if we know which choir we're dealing with
        if (this.$store.state.cache.currentChoir !== null) {
          const choirId = this.$store.state.cache.currentChoir.choirId
          const name = this.$store.state.cache.currentChoir.name
          arr.push({ href: `/choir/${choirId}`, text: name })
        }

        // if we know which song we're dealing with
        // arr.push({ href: '/choir/a/song/b', text: 'Yesterday'})

        // return array of breadcrumb links
        return arr
      }
    }
  }
}
</script>