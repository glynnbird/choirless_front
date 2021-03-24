<template>
  <v-card>
    <v-list-item two-line v-for="choir in choirList" :key="choir.choirId">
      <v-list-item-title><NuxtLink v-bind:to="'choir/' + choir.choirId">{{ choir.choirId }}</NuxtLink> </v-list-item-title>
      <v-list-item-subtitle>{{ choir.description }} </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";
import util from "~/assets/js/util"

export default {
  async asyncData ({store}) {
    //try {
      if (store.state.cache.choirList !== null) {
        console.log("Getting data from cache!")
        return {choirList: store.state.cache.choirList}
      } 
      console.log("getting list of choirs");
      let response = await util.executeLambda (store, "getUserChoirs", {userId:store.state.session.profile["cognito:username"]})

      //save the choirList to the cache
      store.commit('cache/writeChoirList', response.choirs)
      
      return { choirList: response.choirs }
    //} catch (error) {
    //  console.log("error getting list of choirs", error);
    //}
  }
}
</script>
