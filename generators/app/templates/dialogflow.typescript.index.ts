import * as functions from 'firebase-functions';
import { dialogflow } from 'actions-on-google';

const app = dialogflow({
  debug: true
});

app.intent('Default Welcome Intent', (conv): void => {
  conv.close('Hello, world!');
});

exports.fulfillment = functions.https.onRequest(app);
