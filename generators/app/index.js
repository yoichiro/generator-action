const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectDirectoryName',
        message: 'What is your project directory name?',
        validate: projectDirectoryName => {
          return projectDirectoryName !== '';
        }
      },
      {
        type: 'list',
        name: 'actionType',
        message: 'Which type do you want to use for your action?',
        choices: [
          "Actions SDK",
          "Dialogflow"
        ]
      },
      {
        type: 'list',
        name: 'cloudService',
        message: 'Which cloud service do you want to deploy for your action?',
        choices: [
          'Firebase Functions',
          'Google Cloud Functions',
          'Google AppEngine'
        ]
      }
    ]);
    const languages = [];
    if (this.answers.cloudService === 'Firebase Functions' ||
        this.answers.cloudService === 'Google Cloud Functions') {
      languages.push('JavaScript');
      languages.push('TypeScript');
    }
    if (this.answers.cloudService === 'Google AppEngine') {
      languages.push('Java');
    }
    if (languages.length > 1) {
      Object.assign(this.answers, await this.prompt([
        {
          type: 'list',
          name: 'language',
          message: 'Which language do you want to use for your action?',
          choices: languages
        }
      ]));
    } else {
      this.answers.language = languages[0]
    }
    if (this.answers.actionType === 'Actions SDK') {
      Object.assign(this.answers, await this.prompt([
        {
          type: 'input',
          name: 'actionName',
          message: 'What is your action name?',
          default: '__TODO:YOUR_ACTION_NAME__'
        }
      ]));
      if (this.answers.cloudService === 'Firebase Functions' ||
          this.answers.cloudService === 'Google Cloud Functions') {
        Object.assign(this.answers, await this.prompt([
          {
            type: 'input',
            name: 'actionProjectId',
            message: 'What is your action\'s project ID?',
            default: '__TODO:YOUR_ACTION_PROJECT_ID__'
          }
        ]));
      }
    }
    if (this.answers.cloudService === 'Google AppEngine') {
      Object.assign(this.answers, await this.prompt([
        {
          type: 'input',
          name: 'packageName',
          message: 'What is a full package name for your action\'s classes?',
          validate: packageName => {
            return packageName !== '';
          }
        }
      ]));
    }
  }

  writing() {
    if (this.answers.actionType === 'Actions SDK') {
      if (this.answers.cloudService === 'Firebase Functions') {
        if (this.answers.language === 'TypeScript') {
          this._writeForActionsSdkFirebaseFunctionsTypescript();
        } else if (this.answers.language === 'JavaScript') {
          this._writeForActionsSdkFirebaseFunctionsJavascript();
        }
      } else if (this.answers.cloudService === 'Google Cloud Functions') {
        if (this.answers.language === 'TypeScript') {
          this._writeForActionsSdkGoogleCloudFunctionsTypescript();
        } else if (this.answers.language === 'JavaScript') {
          this._writeForActionsSdkGoogleCloudFunctionsJavascript();
        }
      } else if (this.answers.cloudService === 'Google AppEngine') {
        this._writeForActionsSdkGoogleAppEngineJava();
      }
    } else if (this.answers.actionType === 'Dialogflow') {
      if (this.answers.cloudService === 'Firebase Functions') {
        if (this.answers.language === 'TypeScript') {
          this._writeForDialogflowFirebaseFunctionsTypescript();
        } else if (this.answers.language === 'JavaScript') {
          this._writeForDialogflowFirebaseFunctionsJavascript();
        }
      } else if (this.answers.cloudService === 'Google Cloud Functions') {
        if (this.answers.language === 'TypeScript') {
          this._writeForDialogflowGoogleCloudFunctionsTypescript();
        } else if (this.answers.language === 'JavaScript') {
          this._writeForDialogflowGoogleCloudFunctionsJavascript();
        }
      } else if (this.answers.cloudService === 'Google AppEngine') {
        this._writeForDialogflowGoogleAppEngineJava();
      }
    }
  }

  _copyFile(templatePath, destinationPath, options) {
    const _options = options || {};
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(`${this.answers.projectDirectoryName}/${destinationPath}`),
      _options
    );
  }

  // For Dialogflow

  _writeForDialogflowGoogleAppEngineJava() {
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
      `src/main/${packageName}/FulfillmentServlet.java`,
      {
        packageName: this.answers.packageName
      }
    );
    this._copyFile(
      'dialogflow.google-appengine.fulfillment-app.java',
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

  _writeForDialogflowGoogleCloudFunctionsTypescript() {
    this._copyFile(
      'dialogflow.google-cloud-functions.typescript.package.json',
      'package.json'
    );
    this._copyFile(
      'typescript.tsconfig.json',
      'tsconfig.json'
    );
    this._copyFile(
      'typescript.tslint.json',
      'tslint.json'
    );
    this._copyFile(
      'dialogflow.typescript.index.ts',
      'src/index.ts'
    );
  }

  _writeForDialogflowGoogleCloudFunctionsJavascript() {
    this._copyFile(
      'dialogflow.google-cloud-functions.javascript.package.json',
      'package.json'
    );
    this._copyFile(
      'dialogflow.javascript.index.js',
      'index.js'
    );
  }

  _writeForDialogflowFirebaseFunctionsJavascript() {
    this._copyFile(
      'firebase-functions.function.json',
      'function.json'
    );
    this._copyFile(
      'dialogflow.firebase-functions.javascript.package.json',
      'functions/package.json'
    );
    this._copyFile(
      'dialogflow.javascript.index.js',
      'functions/index.js'
    );
  }

  _writeForDialogflowFirebaseFunctionsTypescript() {
    this._copyFile(
      'firebase-functions.function.json',
      'function.json'
    );
    this._copyFile(
      'dialogflow.firebase-functions.typescript.package.json',
      'functions/package.json'
    );
    this._copyFile(
      'typescript.tsconfig.json',
      'functions/tsconfig.json'
    );
    this._copyFile(
      'typescript.tslint.json',
      'functions/tslint.json'
    );
    this._copyFile(
      'typescript.index.ts',
      'functions/src/index.ts'
    );
  }

  // For Actions SDK

  _writeForActionsSdkGoogleAppEngineJava() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json',
      {
        actionName: this.answers.actionName
      }
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
      `src/main/${packageName}/FulfillmentServlet.java`,
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

  _writeForActionsSdkGoogleCloudFunctionsTypescript() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json',
      {
        actionName: this.answers.actionName
      }
    );
    this._copyFile(
      'actions-sdk.google-cloud-functions.typescript.package.json',
      'package.json',
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this._copyFile(
      'actions-sdk.typescript.tsconfig.json',
      'tsconfig.json'
    );
    this._copyFile(
      'actions-sdk.typescript.tslint.json',
      'tslint.json'
    );
    this._copyFile(
      'actions-sdk.typescript.index.ts',
      'src/index.ts'
    );
  }

  _writeForActionsSdkGoogleCloudFunctionsJavascript() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json',
      {
        actionName: this.answers.actionName
      }
    );
    this._copyFile(
      'actions-sdk.google-cloud-functions.javascript.package.json',
      'package.json',
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this._copyFile(
      'actions-sdk.javascript.index.js',
      'index.js'
    );
  }

  _writeForActionsSdkFirebaseFunctionsJavascript() {
    this._copyFile(
      'firebase-functions.function.json',
      'function.json'
    );
    this._copyFile(
      'actions-sdk.action.json',
      'action.json',
      {
        actionName: this.answers.actionName
      }
    );
    this._copyFile(
      'actions-sdk.firebase-functions.javascript.package.json',
      'functions/package.json',
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this._copyFile(
      'actions-sdk.javascript.index.js',
      'functions/index.js'
    );
  }

  _writeForActionsSdkFirebaseFunctionsTypescript() {
    this._copyFile(
      'firebase-functions.function.json',
      'function.json'
    );
    this._copyFile(
      'actions-sdk.action.json',
      'action.json',
      {
        actionName: this.answers.actionName
      }
    );
    this._copyFile(
      'actions-sdk.firebase-functions.typescript.package.json',
      'functions/package.json',
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this._copyFile(
      'actions-sdk.typescript.tsconfig.json',
      'functions/tsconfig.json'
    );
    this._copyFile(
      'actions-sdk.typescript.tslint.json',
      'functions/tslint.json'
    );
    this._copyFile(
      'actions-sdk.typescript.index.ts',
      'functions/src/index.ts'
    );
  }

};
