const Generator = require('yeoman-generator');

module.exports = class extends Generator {

  async prompting() {
    this.answers = await this.prompt([
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
          'Google AppEngine',
          'Azure Functions',
          'Azure App Service'
        ]
      }
    ]);
    const languages = [];
    if (this.answers.cloudService === 'Firebase Functions' ||
        this.answers.cloudService === 'Google Cloud Functions' ||
        this.answers.cloudService === 'Azure Functions' ||
        this.answers.cloudService === 'Azure App Service') {
      languages.push('JavaScript');
      languages.push('TypeScript');
    }
    if (this.answers.cloudService === 'Google AppEngine' ||
        this.answers.cloudService === 'Azure App Service') {
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
        },
        {
          type: 'input',
          name: 'actionProjectId',
          message: 'What is your action\'s project ID?',
          default: '__TODO:YOUR_ACTION_PROJECT_ID__'
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
      }
    }
  }

  // For Dialogflow

  _writeForDialogflowGoogleCloudFunctionsTypescript() {
    this.fs.copyTpl(
      this.templatePath('dialogflow/google-cloud-functions/typescript/package.json.erb'),
      this.destinationPath('package.json')
    );
    this.fs.copyTpl(
      this.templatePath('typescript/tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copyTpl(
      this.templatePath('typescript/tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('dialogflow/typescript/index.ts'),
      this.destinationPath('src/index.ts')
    );
  }

  _writeForDialogflowGoogleCloudFunctionsJavascript() {
    this.fs.copyTpl(
      this.templatePath('dialogflow/google-cloud-functions/javascript/package.json.erb'),
      this.destinationPath('package.json')
    );
    this.fs.copyTpl(
      this.templatePath('dialogflow/javascript/index.js'),
      this.destinationPath('index.js')
    );
  }

  _writeForDialogflowFirebaseFunctionsJavascript() {
    this.fs.copyTpl(
      this.templatePath('firebase-functions/function.json'),
      this.destinationPath('function.json')
    );
    this.fs.copyTpl(
      this.templatePath('dialogflow/firebase-functions/javascript/package.json.erb'),
      this.destinationPath('functions/package.json')
    );
    this.fs.copyTpl(
      this.templatePath('dialogflow/javascript/index.js'),
      this.destinationPath('functions/index.js')
    );
  }

  _writeForDialogflowFirebaseFunctionsTypescript() {
    this.fs.copyTpl(
      this.templatePath('firebae-functions/function.json'),
      this.destinationPath('function.json')
    );
    this.fs.copyTpl(
      this.templatePath('dialogflow/firebase-functions/typescript/package.json.erb'),
      this.destinationPath('functions/package.json')
    );
    this.fs.copyTpl(
      this.templatePath('typescript/tsconfig.json'),
      this.destinationPath('functions/tsconfig.json')
    );
    this.fs.copyTpl(
      this.templatePath('typescript/tslint.json'),
      this.destinationPath('functions/tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('typescript/index.ts'),
      this.destinationPath('functions/src/index.ts')
    );
  }

  // For Actions SDK

  _writeForActionsSdkGoogleCloudFunctionsTypescript() {
    this.fs.copyTpl(
      this.templatePath('actions-sdk/action.json.erb'),
      this.destinationPath('action.json'),
      {
        actionName: this.answers.actionName
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/google-cloud-functions/typescript/package.json.erb'),
      this.destinationPath('package.json'),
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/tslint.json'),
      this.destinationPath('tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/index.ts'),
      this.destinationPath('src/index.ts')
    );
  }

  _writeForActionsSdkGoogleCloudFunctionsJavascript() {
    this.fs.copyTpl(
      this.templatePath('actions-sdk/action.json.erb'),
      this.destinationPath('action.json'),
      {
        actionName: this.answers.actionName
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/google-cloud-functions/javascript/package.json.erb'),
      this.destinationPath('package.json'),
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/javascript/index.js'),
      this.destinationPath('index.js')
    );
  }

  _writeForActionsSdkFirebaseFunctionsJavascript() {
    this.fs.copyTpl(
      this.templatePath('firebase-functions/function.json'),
      this.destinationPath('function.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/action.json.erb'),
      this.destinationPath('action.json'),
      {
        actionName: this.answers.actionName
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/firebase-functions/javascript/package.json.erb'),
      this.destinationPath('functions/package.json'),
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/javascript/index.js'),
      this.destinationPath('functions/index.js')
    );
  }

  _writeForActionsSdkFirebaseFunctionsTypescript() {
    this.fs.copyTpl(
      this.templatePath('firebae-functions/function.json'),
      this.destinationPath('function.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/action.json.erb'),
      this.destinationPath('action.json'),
      {
        actionName: this.answers.actionName
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/firebase-functions/typescript/package.json.erb'),
      this.destinationPath('functions/package.json'),
      {
        actionProjectId: this.answers.actionProjectId
      }
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/tsconfig.json'),
      this.destinationPath('functions/tsconfig.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/tslint.json'),
      this.destinationPath('functions/tslint.json')
    );
    this.fs.copyTpl(
      this.templatePath('actions-sdk/typescript/index.ts'),
      this.destinationPath('functions/src/index.ts')
    );
  }

};
