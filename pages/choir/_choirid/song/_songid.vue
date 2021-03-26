<template>
  <v-card>
    <v-list-item two-line v-for="part in partsList" :key="part.partId">
      <v-list-item-subtitle>{{ part.partName }} </v-list-item-subtitle>
      <v-list-item-subtitle>{{ part.userName }} </v-list-item-subtitle>
    </v-list-item>
    <v-card-actions>
      <v-btn
        text
        nuxt
        to="/record"
      >
        Record
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";
import util from "~/assets/js/util"

export default {
  async asyncData ({store, route}) {
    console.log("route is ", route)
    console.log("choir id is ", route.params.choirid)
    console.log("song id is ", route.params.songid)

    try {
      // if we get here, then we need to load the choir and its songs
      console.log("Getting choir details")
      let response
      if (store.state.cache.currentChoir === null || store.state.cache.currentChoir.choirId !== route.params.choirid) {    
        response = await util.executeLambda (store, "getChoir", {choirId:route.params.choirid})

        //save the choirList to the cache
        store.commit('cache/setCurrentChoir', response.choir)
      }
 

      // let's do some lambda to get the current song
      if (store.state.cache.currentSong === null || store.state.cache.currentSong.songId !== route.params.songid) {
        response = await util.executeLambda (store, "getChoirSong", {choirId:route.params.choirid, songId: route.params.songid})

        //save the song to the cache
        console.log('getChoirSong response', response)
        store.commit('cache/setCurrentSong', response.song)
      }

      // let's do some lambda to get the list of song parts
      response = await util.executeLambda (store, "getChoirSongParts", {choirId:route.params.choirid, songId:route.params.songid})
      return { partsList: response.parts }
     
    } catch (error) {
      console.log("error getting list of song Parts", error);
    }
  }
}
</script>
