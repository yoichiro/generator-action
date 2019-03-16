const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json'
    );

    this.sourceRoot(path.join(__dirname, './templates'));

    this._copyFile(
      'pom.xml',
      'pom.xml',
      {
        packageName: this.answers.packageName,
        artifactId: this.answers.artifactId,
        resourceGroupName: this.answers.resourceGroupName,
        appName: this.answers.appName,
        locationName: this.answers.locationName,
        pricingTierName: this.answers.pricingTierName
      }
    );
    const packageName = this.answers.packageName.replace(/\./g, '/');
    this._copyFile(
      'fulfillment-servlet.java',
      `src/main/java/${packageName}/FulfillmentServlet.java`,
      {
        packageName: this.answers.packageName
      }
    );
    this._copyFile(
      'fulfillment-app.java',
      `src/main/java/${packageName}/FulfillmentApp.java`,
      {
        packageName: this.answers.packageName
      }
    );
  }

};
