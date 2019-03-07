import * as functions from 'firebase-functions';
import { actionssdk } from 'actions-on-google';

const app = actionssdk({
  debug: true
});

app.intent('actions.intent.MAIN', (conv): void => {
  conv.close('Hello, world!');
});

exports.fulfillment = functions.https.onRequest(app);
