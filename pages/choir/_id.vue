<template>
  <v-card>
    <v-list-item two-line v-for="song in songList" :key="song.songId">
      <v-list-item-title><NuxtLink v-bind:to="'/choir/' + song.choirId + '/song/' + song.songId">{{ song.songId }}</NuxtLink> </v-list-item-title>
      <v-list-item-subtitle>{{ song.name }} </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";
import util from "~/assets/js/util"

export default {
  async asyncData ({store, route}) {
    console.log("choir route is", route)
    console.log(route.params.id)

    try {
      //first check that choir page we are on  matches  the cache
      if (store.state.cache.currentChoir !== null && 
          store.state.cache.currentChoir.choirId == route.params.id) {
        if (store.state.cache.currentChoirSongs !== null) {
          console.log("Getting data from cache!")
          return {songList: store.state.cache.currentChoirSongs}
        }
      }

      // if we get here, then we need to load the choir and its songs

      console.log("Getting choir details")
     
      let response = await util.executeLambda (store, "getChoir", {choirId:route.params.id})

      //save the choirList to the cache
      store.commit('cache/setCurrentChoir', response.choir)
 
      console.log("getting list of choir songs");

      // let's do some lambda to get the list of choirs
      response = await util.executeLambda (store, "getChoirSongs", {choirId:route.params.id})

      //save the Songs to the cache
      store.commit('cache/setCurrentChoirSongs', response.songs)
      
      return { songList: response.songs }
     
    } catch (error) {
      console.log("error getting list of songs", error);
    }
  }
}
</script>
