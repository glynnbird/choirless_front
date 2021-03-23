<template>
  <v-card>
    <v-list-item two-line v-for="song in songList">
      <v-list-item-title><NuxtLink v-bind:to="'/choir/' + song.choirId + '/song/' + song.songId">{{ song.songId }}</NuxtLink> </v-list-item-title>
      <v-list-item-subtitle>{{ song.name }} </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";

export default {
  async asyncData ({store, route}) {
    console.log(route.params.id)

    try {
      if (store.state.cache.currentChoirSongs !== null) {
        console.log("Getting data from cache!")
        return {songList: store.state.cache.currentChoirSongs}
      }

 
      console.log("getting list of choir songs");
      console.log(store.state.session.profile)
      const credentials = store.state.session.credentials;
      AWS.config.update(credentials);

      // let's do some lambda to get the list of choirs
      const lambda = new AWS.Lambda({ region: store.state.config.config.REGION });
      var payload = {choirId: route.params.id};
      var params = {
        FunctionName: store.state.config.config.LAMBDA_NAMES['getChoirSongs'],
        Payload: JSON.stringify(payload),
        InvocationType: "RequestResponse",
      }; 
      const response = await lambda.invoke(params).promise();
      const responsePayload = JSON.parse(response.Payload);
      console.log(responsePayload);
      const body = JSON.parse(responsePayload.body)
      console.log('body', body)
      //save the choirList to the cache
      store.commit('cache/setCurrentChoirSongs', body.songs)
      
      return { songList: body.songs }
     
    } catch (error) {
      console.log("error getting list of songs", error);
    }
  }
}
</script>
