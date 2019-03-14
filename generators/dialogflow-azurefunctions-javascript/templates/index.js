const { dialogflow } = require('actions-on-google');
const express = require('express');
const { createHandler } = require('azure-function-express');

const app = dialogflow();

app.intent('Default Welcome Intent', conv => {
  conv.close('Hello, world!');
});

const expressApp = express();
expressApp.post('/api/fulfillment', app);

module.exports = createHandler(expressApp);
