const Generator = require('yeoman-generator');
const Base = require('../../utils/base');

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'firebase-functions.firebase.json',
      'firebase.json'
    );
    this._copyFile(
      'firebase-functions.firebaserc',
      '.firebaserc',
      {
        actionProjectId: this.answers.actionProjectId
      }
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
      'dialogflow.typescript.index.ts',
      'functions/src/index.ts'
    );
  }

};
