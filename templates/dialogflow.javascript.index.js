const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

const app = dialogflow({
  debug: true
});

app.intent('Default Welcome Intent', conv => {
  conv.close('Hello, world!');
});

exports.fulfillment = functions.https.onRequest(app);
