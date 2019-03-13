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
          this.answers.cloudService === 'Google Cloud Functions') {
        const hasYarn = commandExists('yarn');
        const hasNpm = commandExists('npm');
        const cwd = this.answers.cloudService === 'Firebase Functions' ? 'functions' : '.';
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
    if (this.answers.actionType !== 'Sample') {
      let messages = [];
      messages = messages.concat(config.endMessages[this.answers.cloudService]);
      if (this.answers.actionType === 'Actions SDK') {
        messages = messages.concat(config.endMessages['Actions SDK']);
      }
      messages.forEach(message => {
        this.log(message);
      });
    }
    this.log.writeln();
    this.log('Have fun!');
  }

};
