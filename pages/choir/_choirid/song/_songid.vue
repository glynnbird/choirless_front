<template>
  <v-card>
    <h3>hello world!</h3>
    <v-list-item two-line v-for="part in partsList" :key="part.partId">
      <v-list-item-subtitle>{{ part.partName }} </v-list-item-subtitle>
      <v-list-item-subtitle>{{ part.userName }} </v-list-item-subtitle>
    </v-list-item>
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
      //first check that choir page we are on  matches  the cache
/*      if (store.state.cache.currentChoir !== null && 
          store.state.cache.currentChoir.choirId == route.params.id) {
        if (store.state.cache.currentChoirSongs !== null) {
          console.log("Getting data from cache!")
          return {songList: store.state.cache.currentChoirSongs}
        }
      } */

      // if we get here, then we need to load the choir and its songs

      console.log("Getting choir details")
     
      //let response = await util.executeLambda (store, "getChoir", {choirId:route.params.id})

      //save the choirList to the cache
      //store.commit('cache/setCurrentChoir', response.choir)
 
      console.log("getting list of choir songs");

      // let's do some lambda to get the list of choirs
      //response = await util.executeLambda (store, "getChoirSong", {choirId:route.params.id, songId: route.params.songid})

      //save the Songs to the cache
      //store.commit('cache/setCurrentChoirSongs', response.songs)
      
      // let's do some lambda to get the list of song parts
      let response = await util.executeLambda (store, "getChoirSongParts", {choirId:route.params.choirid, songId:route.params.songid})
      console.log(response.parts)

      //save the song parts to the cache
      //store.commit('cache/setCurrentChoirSongParts', response.songParts)
      
      return { partsList: response.parts }
     
    } catch (error) {
      console.log("error getting list of song Parts", error);
    }
  }
}
</script>
