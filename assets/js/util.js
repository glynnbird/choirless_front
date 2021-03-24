import AWS from "aws-sdk";

const util = {
  executeLambda: async function (store, lambdaName, payload) {
    const credentials = store.state.session.credentials;
    AWS.config.update(credentials);
    const lambda = new AWS.Lambda({ region: store.state.config.config.REGION });
    const params = {
      FunctionName: store.state.config.config.LAMBDA_NAMES[lambdaName],
      Payload: JSON.stringify(payload),
      InvocationType: "RequestResponse",
    }; 
    console.log("params is ", params)
    const response = await lambda.invoke(params).promise();
    const responsePayload = JSON.parse(response.Payload);
    console.log(responsePayload);
    const body = JSON.parse(responsePayload.body)
    console.log('body', body)
    return body

  }
}

export default util
