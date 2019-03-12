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
      'actions-sdk.action.json',
      'action.json'
    );
    this._copyFile(
      'actions-sdk.firebase-functions.typescript.package.json',
      'functions/package.json',
      {
        actionProjectId: this.answers.actionProjectId
      }
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
      'actions-sdk.typescript.index.ts',
      'functions/src/index.ts'
    );
  }

};
