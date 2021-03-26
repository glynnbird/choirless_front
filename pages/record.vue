<template>
 <div>
  <v-form>
   <v-select
     label="Pick part name"
     :items="song.partNames"
     v-model="partName"
     required></v-select>
  </v-form>
  {{partName}}
 </div>
</template>

<script>
import AWS from "aws-sdk";
import util from "~/assets/js/util"

export default {
  data: function() {
    return { partName: '' }
  },
  async asyncData ({store}) {
    // sanity check that we know which song we're dealing with
    if (store.state.cache.currentSong === null) {
      this.$router.push({name:'choirselect'})
      return
    }
    return { song: store.state.cache.currentSong }
  }
}
</script>
