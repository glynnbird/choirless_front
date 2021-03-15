<template>
  <div>
    {{ choir }}
  </div>
</template>

<script>
import AWS from "aws-sdk";

export default {
  async asyncData ({store, route}) {
    console.log(route.params.id)

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
      const lambda = new AWS.Lambda({ region: "eu-west-1" });
      var payload = {userId:store.state.session.profile["cognito:username"]};
      var params = {
        FunctionName: "getUserChoirs-stage",
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
