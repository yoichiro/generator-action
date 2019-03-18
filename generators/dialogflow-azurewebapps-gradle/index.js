const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this.sourceRoot(path.join(__dirname, './templates'));
    this._copyFile(
      'build.gradle',
      'build.gradle',
      {
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
    this._copyFile(
      'gradlew.bat',
      'gradlew.bat'
    );
    this._copyFile(
      'gradlew',
      'gradlew'
    );
    this._copyFile(
      'gradle-wrapper.properties',
      'gradle/wrapper/gradle-wrapper.properties'
    );
    this._copyFile(
      'gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.jar'
    );

  }

};
