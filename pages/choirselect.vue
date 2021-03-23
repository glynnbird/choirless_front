<template>
  <v-card>
    <v-list-item two-line v-for="choir in choirList">
      <v-list-item-title><NuxtLink v-bind:to="'choir/' + choir.choirId">{{ choir.choirId }}</NuxtLink> </v-list-item-title>
      <v-list-item-subtitle>{{ choir.description }} </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import AWS from "aws-sdk";

export default {
  async asyncData ({store}) {
    //try {
      if (store.state.cache.choirList !== null) {
        console.log("Getting data from cache!")
        return {choirList: store.state.cache.choirList}
      } 
      console.log("getting list of choirs");
      console.log(store.state.session.profile)
      const credentials = store.state.session.credentials;
      AWS.config.update(credentials);

      // let's do some lambda to get the list of choirs
      const lambda = new AWS.Lambda({ region: store.state.config.config.REGION });
      var payload = {userId:store.state.session.profile["cognito:username"]};
      var params = {
        FunctionName: store.state.config.config.LAMBDA_NAMES['getUserChoirs'],
        Payload: JSON.stringify(payload),
        InvocationType: "RequestResponse",
      }; 
      const response = await lambda.invoke(params).promise();
      const responsePayload = JSON.parse(response.Payload);
      console.log(responsePayload);
      const body = JSON.parse(responsePayload.body)
      //save the choirList to the cache
      store.commit('cache/writeChoirList', body.choirs)
      
      return { choirList: body.choirs }
    //} catch (error) {
    //  console.log("error getting list of choirs", error);
    //}
  }
}
</script>
