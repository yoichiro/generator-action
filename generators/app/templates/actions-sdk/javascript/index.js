const functions = require('firebase-functions');
const { actionssdk } = require('actions-on-google');

const app = actionssdk({
  debug: true
});

app.intent('actions.intent.MAIN', conv => {
  conv.close('Hello, world!');
});

exports.fulfillment = functions.https.onRequest(app);
