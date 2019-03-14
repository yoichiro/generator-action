const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

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
      'multivocal.firebase-functions.typescript.package.json',
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
      'multivocal.firebase-functions.typescript.index.ts',
      'functions/src/index.ts'
    );
  }

};
