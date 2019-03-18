const Generator = require('yeoman-generator');
const yosay = require('yosay');
const commandExists = require('command-exists').sync;
const config = require('./config');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    for (let optionName in config.options) {
      this.option(optionName, config.options[optionName]);
    }
  }

  async prompting() {
    if (!this.options['skip-welcome-message']) {
      this.log(
        yosay(
          "'Allo 'allo! Out of the box I include a build file, source files and other necessary files to build your action for Google Assistant."
        )
      );
    }

    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'actionType',
        message: 'Which type do you want to use for your action?',
        choices: [
          {
            name: 'Actions SDK with Actions on Google Client Library',
            value: 'Actions SDK'
          },
          {
            name: 'Dialogflow with Actions on Google Client Library',
            value: 'Dialogflow'
          },
          {
            name: 'Dialogflow with Multivocal',
            value: 'Multivocal'
          },
          {
            name: 'Sample Action',
            value: 'Sample'
          }
        ]
      }
    ]);
    if (this.answers.actionType === 'Sample') {
      Object.assign(this.answers, await this.prompt([
        {
          type: 'list',
          name: 'sampleType',
          message: 'Which type of the sample action do you want to create?',
          choices: [
            {
              name: 'Actions on Google Codelab (Level 1)',
              value: 'CodelabLevel1'
            },
            {
              name: 'Actions on Google Codelab (Level 2)',
              value: 'CodelabLevel2'
            },
            {
              name: 'Actions on Google Codelab (Level 3)',
              value: 'CodelabLevel3'
            }
          ]
        },
        {
          type: 'input',
          name: 'actionProjectId',
          message: 'What is your project ID?',
          default: '__TODO:YOUR_PROJECT_ID__'
        }
      ]));
    } else {
      const cloudServices = [];
      if (this.answers.actionType === 'Multivocal') {
        cloudServices.push('Firebase Functions');
        cloudServices.push('Google Cloud Functions');
      } else {
        cloudServices.push('Firebase Functions');
        cloudServices.push('Google Cloud Functions');
        cloudServices.push('Google AppEngine');
        cloudServices.push('Azure Functions');
        cloudServices.push('Azure Web Apps');
      }
      Object.assign(this.answers, await this.prompt([
        {
          type: 'list',
          name: 'cloudService',
          message: 'Which cloud service do you want to deploy for your action?',
          choices: cloudServices
        }
      ]));
      const languages = [];
      if (this.answers.cloudService === 'Firebase Functions' ||
          this.answers.cloudService === 'Google Cloud Functions') {
        languages.push('JavaScript');
        languages.push('TypeScript');
      } else if (this.answers.cloudService === 'Google AppEngine') {
        languages.push('Java');
      } else if (this.answers.cloudService === 'Azure Functions') {
        languages.push('JavaScript');
      } else if (this.answers.cloudService === 'Azure Web Apps') {
        languages.push(
          {
            name: 'Java (Maven)',
            value: 'Maven'
          },
          {
            name: 'Java (Gradle)',
            value: 'Gradle'
          }
        );
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
      if (this.answers.cloudService === 'Firebase Functions' ||
          (this.answers.actionType === 'Actions SDK' &&
            this.answers.cloudService === 'Google Cloud Functions')) {
        Object.assign(this.answers, await this.prompt([
          {
            type: 'input',
            name: 'actionProjectId',
            message: 'What is your project ID?',
            default: '__TODO:YOUR_PROJECT_ID__'
          }
        ]));
      }
      if (this.answers.cloudService === 'Google AppEngine' ||
          this.answers.cloudService === 'Azure Web Apps') {
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
      if (this.answers.cloudService === 'Azure Web Apps') {
        if (this.answers.language === 'Maven') {
          Object.assign(this.answers, await this.prompt([
            {
              type: 'input',
              name: 'artifactId',
              message: 'What is an Artifact ID for your webapp?',
              default: '__TODO:YOUR_ARTIFACT_ID__'
            }
          ]));
        }
        Object.assign(this.answers, await this.prompt([
          {
            type: 'input',
            name: 'resourceGroupName',
            message: 'What is a resource group name for your webapp?',
            default: '__TODO:RESOURCE_GROUP_NAME__'
          },
          {
            type: 'input',
            name: 'appName',
            message: 'What is an app name for your webapp?',
            default: '__TODO:YOUR_APP_NAME__'
          },
          {
            type: 'input',
            name: 'locationName',
            message: 'What is a location name for your webapp?',
            default: '__TODO:YOUR_LOCATION_NAME__'
          },
          {
            type: 'input',
            name: 'pricingTierName',
            message: 'What is a pricing tier name for your webapp?',
            default: '__TODO:YOUR_PRICING_TIER_NAME__'
          }
        ]));
      }
    }
  }

  _invokeSubGenerator(generatorPath) {
    this.composeWith(require.resolve(generatorPath), {
      options: this.options,
      answers: this.answers
    });
  }

  default() {
    if (this.answers.actionType === 'Sample') {
      this._invokeSubGenerator(config.generatorMap[this.answers.actionType][this.answers.sampleType]);
    } else {
      const cloudServiceData = config.generatorMap[this.answers.actionType][this.answers.cloudService];
      if (typeof cloudServiceData === 'object') {
        this._invokeSubGenerator(cloudServiceData[this.answers.language]);
      } else {
        this._invokeSubGenerator(cloudServiceData);
      }
    }
  }

  install() {
    if (!this.options['skip-install']) {
      if (this.answers.cloudService === 'Firebase Functions' ||
          this.answers.cloudService === 'Google Cloud Functions' ||
          this.answers.cloudService === 'Azure Functions') {
        const hasYarn = commandExists('yarn');
        const hasNpm = commandExists('npm');
        let cwd = '.';
        if (this.answers.cloudService === 'Firebase Functions') {
          cwd = 'functions';
        } else if (this.answers.cloudService === 'Azure Functions') {
          cwd = 'fulfillment';
        }
        if (hasYarn) {
          this.log.invoke('Execute `yarn install`');
          this.spawnCommandSync('yarn', ['install'], { cwd });
        } else {
          if (hasNpm) {
            this.log.invoke('Execute `npm install`');
            this.spawnCommandSync('npm', ['install'], { cwd });
          }
        }
      }
    }
  }

  end() {
    if (this.options['skip-instruction-message']) {
      return;
    }
    this.log.ok('All files have been generated.');
    let messages = [];
    if (this.answers.actionType === 'Sample') {
      messages = messages.concat(config.endMessages[this.answers.sampleType]);
    } else {
      const cloudServiceMessages = config.endMessages[this.answers.cloudService];
      if (cloudServiceMessages instanceof Array) {
        messages = messages.concat(cloudServiceMessages);
      } else {
        messages = cloudServiceMessages[this.answers.language];
      }
    }
    if (this.answers.actionType === 'Actions SDK') {
      messages = messages.concat(config.endMessages['Actions SDK']);
    }
  messages.forEach(message => {
      this.log(message);
    });
  this.log.writeln();
    this.log('Have fun!');
  }

};
