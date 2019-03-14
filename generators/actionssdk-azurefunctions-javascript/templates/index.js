const { actionssdk } = require('actions-on-google');
const express = require('express');
const { createHandler } = require('azure-function-express');

const app = actionssdk();

app.intent('actions.intent.MAIN', conv => {
  conv.close('Hello, world!');
});

const expressApp = express();
expressApp.post('/api/fulfillment', app);

module.exports = createHandler(expressApp);
