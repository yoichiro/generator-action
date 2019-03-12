const Multivocal = require('multivocal');

new Multivocal.Config.Simple({
  Local: {
    und: {
      Response: {
        'Intent.Default Welcome Intent': [
          {
            Template: {
              Text: 'Hello, world!'
            },
            ShouldClose: true
          }
        ]
      }
    }
  }
});

exports.fulfillment = Multivocal.processFirebaseWebhook;
