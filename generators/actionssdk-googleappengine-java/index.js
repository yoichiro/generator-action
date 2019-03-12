const Generator = require('yeoman-generator');
const Base = require('../../utils/base');

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
    this._copyFile(
      'google-appengine.gradlew.bat',
      'gradlew.bat'
    );
    this._copyFile(
      'google-appengine.gradlew',
      'gradlew'
    );
    this._copyFile(
      'google-appengine.gradle-wrapper.properties',
      'gradle/wrapper/gradle-wrapper.properties'
    );
    this._copyFile(
      'google-appengine.gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.jar'
    );
    this._copyFile(
      'google-appengine.build.gradle',
      'build.gradle',
      {
        packageName: this.answers.packageName
      }
    );
    const packageName = this.answers.packageName.replace(/\./g, '/');
    this._copyFile(
      'google-appengine.fulfillment-servlet.java',
      `src/main/java/${packageName}/FulfillmentServlet.java`,
      {
        packageName: this.answers.packageName
      }
    );
    this._copyFile(
      'actions-sdk.google-appengine.fulfillment-app.java',
      `src/main/java/${packageName}/FulfillmentApp.java`,
      {
        packageName: this.answers.packageName
      }
    );
    this._copyFile(
      'google-appengine.appengine-web.xml',
      'src/main/webapp/WEB-INF/appengine-web.xml'
    );
  }

};
