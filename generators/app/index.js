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
          }
        ]
      }
    ]);
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

  _invokeSubGenerator(generatorPath) {
    this.composeWith(require.resolve(generatorPath), {
      options: this.options,
      answers: this.answers
    });
  }

  default() {
    if (this.answers.actionType === 'Actions SDK') {
      if (this.answers.cloudService === 'Firebase Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../actionssdk-firebasefunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../actionssdk-firebasefunctions-javascript');
        }
      } else if (this.answers.cloudService === 'Google Cloud Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../actionssdk-googlecloudfunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../actionssdk-googlecloudfunctions-javascript');
        }
      } else if (this.answers.cloudService === 'Google AppEngine') {
        this._invokeSubGenerator('../actionssdk-googleappengine-java');
      }
    } else if (this.answers.actionType === 'Dialogflow') {
      if (this.answers.cloudService === 'Firebase Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../dialogflow-firebasefunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../dialogflow-firebasefunctions-javascript');
        }
      } else if (this.answers.cloudService === 'Google Cloud Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../dialogflow-googlecloudfunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../dialogflow-googlecloudfunctions-javascript');
        }
      } else if (this.answers.cloudService === 'Google AppEngine') {
        this._invokeSubGenerator('../dialogflow-googleappengine-java');
      }
    } else if (this.answers.actionType === "Multivocal") {
      if (this.answers.cloudService === 'Firebase Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../multivocal-firebasefunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../multivocal-firebasefunctions-javascript');
        }
      } else if (this.answers.cloudService === 'Google Cloud Functions') {
        if (this.answers.language === 'TypeScript') {
          this._invokeSubGenerator('../multivocal-googlecloudfunctions-typescript');
        } else if (this.answers.language === 'JavaScript') {
          this._invokeSubGenerator('../multivocal-googlecloudfunctions-javascript');
        }
      }
    }
  }

  install() {
    return;
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
    let messages = [];
    messages = messages.concat(config.endMessages[this.answers.cloudService]);
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
