const path = require('path');
const Base = require(path.join(__dirname, '../../utils/base'));

module.exports = class extends Base {

  constructor(args, opts) {
    super(args, opts);
    this.answers = opts.answers;
  }

  writing() {
    this._copyFile(
      'actions-sdk.action.json',
      'action.json'
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

};
