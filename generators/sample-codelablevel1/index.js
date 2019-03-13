const Generator = require('yeoman-generator');
const path = require('path');
const Base = require('../../utils/base');

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this.sourceRoot(path.join(__dirname, './templates'));
    this._copyFile(
      'firebase.json',
      'firebase.json'
    );
    this._copyFile(
      'codelab-level-one.zip',
      'codelab-level-one.zip'
    );
    this._copyFile(
      'eslintrc.json',
      'functions/.eslintrc.json'
    );
    this._copyFile(
      'index.js',
      'functions/index.js'
    );
    this._copyFile(
      'package.json',
      'functions/package.json'
    );
  }

};
