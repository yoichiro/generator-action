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
      'multivocal.firebase-functions.javascript.package.json',
      'functions/package.json'
    );
    this._copyFile(
      'multivocal.firebase-functions.javascript.index.js',
      'functions/index.js'
    );
  }

};
